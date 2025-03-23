import os
import logging
import re
import requests
import urllib.parse
from urllib.parse import urljoin, urlparse
import time
from bs4 import BeautifulSoup
import tempfile
import trafilatura

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

def get_website_text_content(url):
    """
    This function takes a url and returns the main text content of the website.
    The text content is extracted using trafilatura and easier to understand.
    The results is not directly readable, better to be summarized by LLM before consume
    by the user.
    
    Args:
        url (str): URL of the website to extract text from
        
    Returns:
        str: Extracted text content or None if failed
    """
    try:
        # Send a request to the website
        downloaded = trafilatura.fetch_url(url)
        text = trafilatura.extract(downloaded)
        return text
    except Exception as e:
        logger.error(f"Error extracting text content: {str(e)}")
        return None

def clone_website(url, target_dir):
    """
    Clone a website and save its content to the target directory using requests and BeautifulSoup
    
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
        
        # Fetch the page using requests
        logger.info(f"Fetching URL with requests: {url}")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
        
        try:
            # Get the page content
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()  # Raise exception for 4XX/5XX responses
            
            html_content = response.text
            
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
            
        except requests.Timeout:
            logger.error("Timeout while loading the page")
            return {
                'success': False,
                'message': "Timeout while loading the page"
            }
        except requests.HTTPError as e:
            logger.error(f"HTTP error: {str(e)}")
            return {
                'success': False,
                'message': f"HTTP error: {str(e)}"
            }
        except requests.RequestException as e:
            logger.error(f"Request error: {str(e)}")
            return {
                'success': False,
                'message': f"Request error: {str(e)}"
            }
            
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
