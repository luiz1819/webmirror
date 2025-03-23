import os
import logging
import re
import requests
import urllib.parse
from urllib.parse import urljoin, urlparse
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException, TimeoutException
import tempfile

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def validate_url(url):
    """
    Validate if the given string is a valid URL
    
    Args:
        url (str): URL to validate
        
    Returns:
        tuple: (is_valid, message)
    """
    if not url:
        return False, "URL cannot be empty"
    
    # Make sure URL has a scheme
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    try:
        result = urlparse(url)
        if not all([result.scheme, result.netloc]):
            return False, "Invalid URL format"
        return True, "URL is valid"
    except Exception as e:
        return False, f"URL validation error: {str(e)}"

def setup_selenium():
    """
    Set up and return a Selenium WebDriver
    
    Returns:
        webdriver: Configured Chrome WebDriver
    """
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    
    # Setup Chrome WebDriver
    try:
        driver = webdriver.Chrome(options=options)
        driver.set_page_load_timeout(30)
        return driver
    except Exception as e:
        logger.error(f"Error setting up Selenium: {str(e)}")
        raise

def clone_website(url, target_dir):
    """
    Clone a website and save its content to the target directory
    
    Args:
        url (str): URL of the website to clone
        target_dir (str): Directory to save the cloned website
        
    Returns:
        dict: Result of the cloning operation
    """
    try:
        # Make sure target directory exists
        os.makedirs(target_dir, exist_ok=True)
        
        # Make sure URL has a scheme
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        # Parse the URL to extract the domain
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
        
        # Setup Selenium
        driver = setup_selenium()
        
        try:
            # Load the page with Selenium
            logger.info(f"Fetching URL: {url}")
            driver.get(url)
            
            # Wait for the page to load completely
            time.sleep(3)  # Give some time for JavaScript to execute
            
            # Get the page source
            html_content = driver.page_source
            
            # Save the main HTML file
            index_path = os.path.join(target_dir, 'index.html')
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            # Parse the HTML
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Create a set to keep track of already processed resources
            processed_resources = set()
            
            # Process CSS files
            for link in soup.find_all('link', rel='stylesheet'):
                css_url = link.get('href')
                if css_url:
                    download_resource(css_url, target_dir, base_url, processed_resources)
            
            # Process JavaScript files
            for script in soup.find_all('script', src=True):
                js_url = script.get('src')
                if js_url:
                    download_resource(js_url, target_dir, base_url, processed_resources)
            
            # Process images
            for img in soup.find_all('img', src=True):
                img_url = img.get('src')
                if img_url:
                    download_resource(img_url, target_dir, base_url, processed_resources)
            
            # Process other resources like favicon, fonts, etc.
            for link in soup.find_all('link'):
                if 'href' in link.attrs:
                    href = link.get('href')
                    if href and not href.startswith('#'):
                        download_resource(href, target_dir, base_url, processed_resources)
            
            # Process background images in style attributes
            for tag in soup.find_all(style=True):
                style = tag.get('style')
                urls = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', style)
                for style_url in urls:
                    if style_url:
                        download_resource(style_url, target_dir, base_url, processed_resources)
            
            # Process embedded stylesheets for additional URLs
            for style in soup.find_all('style'):
                if style.string:
                    urls = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', style.string)
                    for style_url in urls:
                        if style_url:
                            download_resource(style_url, target_dir, base_url, processed_resources)
            
            return {
                'success': True,
                'message': 'Website cloned successfully',
                'files_downloaded': len(processed_resources)
            }
            
        except TimeoutException:
            logger.error("Timeout while loading the page")
            return {
                'success': False,
                'message': "Timeout while loading the page"
            }
        except WebDriverException as e:
            logger.error(f"Selenium error: {str(e)}")
            return {
                'success': False,
                'message': f"Selenium error: {str(e)}"
            }
        finally:
            # Clean up Selenium
            driver.quit()
            
    except Exception as e:
        logger.error(f"Error cloning website: {str(e)}", exc_info=True)
        return {
            'success': False,
            'message': f"Error: {str(e)}"
        }

def download_resource(resource_url, target_dir, base_url, processed_resources):
    """
    Download a resource and save it to the appropriate location
    
    Args:
        resource_url (str): URL of the resource to download
        target_dir (str): Base directory to save the resources
        base_url (str): Base URL of the website
        processed_resources (set): Set of already processed resource URLs
    """
    try:
        # Skip if the resource has been processed already
        if resource_url in processed_resources:
            return
        
        # Skip data URLs
        if resource_url.startswith('data:'):
            return
        
        # Skip empty URLs
        if not resource_url.strip():
            return
        
        # Skip javascript URLs
        if resource_url.startswith('javascript:'):
            return
        
        # Resolve the absolute URL
        absolute_url = urljoin(base_url, resource_url)
        processed_resources.add(resource_url)
        
        # Parse the URL to extract the path
        parsed_url = urlparse(absolute_url)
        path = parsed_url.path.strip('/')
        
        # Skip anchor links
        if not path and (parsed_url.fragment or parsed_url.query):
            return
        
        # Determine the local path
        if path:
            # Create a valid filename from the path
            local_path = os.path.join(target_dir, path)
        else:
            # Use a default name for the root path
            local_path = os.path.join(target_dir, 'index.html')
        
        # Create the directory structure
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        
        # Download the resource
        try:
            # Get the resource with a timeout
            response = requests.get(absolute_url, timeout=10)
            
            # Check if the request was successful
            if response.status_code == 200:
                # Save the resource
                with open(local_path, 'wb') as f:
                    f.write(response.content)
                
                # If it's a CSS file, parse it for additional resources
                if path.endswith('.css'):
                    css_content = response.text
                    urls = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', css_content)
                    for css_url in urls:
                        if css_url and not css_url.startswith('data:'):
                            download_resource(css_url, target_dir, os.path.dirname(absolute_url) + '/', processed_resources)
            else:
                logger.warning(f"Failed to download {absolute_url}: Status code {response.status_code}")
        except requests.RequestException as e:
            logger.warning(f"Failed to download {absolute_url}: {str(e)}")
        
    except Exception as e:
        logger.warning(f"Error downloading resource {resource_url}: {str(e)}")
