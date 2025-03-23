import os
import logging
import time
import requests
import urllib.parse
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException
from webdriver_manager.chrome import ChromeDriverManager

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def clone_website(url, output_dir):
    """
    Clone a website and save its resources to the output directory
    
    Args:
        url (str): URL of the website to clone
        output_dir (str): Directory to save cloned files
    
    Returns:
        dict: Result of cloning operation with success status and error message if any
    """
    # Validate URL
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url
    
    # Parse URL components
    parsed_url = urllib.parse.urlparse(url)
    base_url = f"{parsed_url.scheme}://{parsed_url.netloc}"
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    try:
        # Initialize Selenium WebDriver
        driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )
        
        # Load the webpage
        logger.info(f"Loading webpage: {url}")
        driver.get(url)
        
        # Wait for dynamic content to load
        time.sleep(3)
        
        # Get the page source
        html_content = driver.page_source
        
        # Save the main HTML file
        index_path = os.path.join(output_dir, 'index.html')
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        # Parse HTML with BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Create directories for assets
        css_dir = os.path.join(output_dir, 'css')
        js_dir = os.path.join(output_dir, 'js')
        img_dir = os.path.join(output_dir, 'images')
        font_dir = os.path.join(output_dir, 'fonts')
        
        os.makedirs(css_dir, exist_ok=True)
        os.makedirs(js_dir, exist_ok=True)
        os.makedirs(img_dir, exist_ok=True)
        os.makedirs(font_dir, exist_ok=True)
        
        # Process and download CSS files
        logger.info("Processing CSS files")
        for link in soup.find_all('link', rel='stylesheet'):
            css_url = link.get('href')
            if not css_url:
                continue
            
            # Resolve relative URLs
            if css_url.startswith('//'):
                css_url = parsed_url.scheme + ':' + css_url
            elif not css_url.startswith(('http://', 'https://')):
                if css_url.startswith('/'):
                    css_url = base_url + css_url
                else:
                    css_url = base_url + '/' + css_url
            
            try:
                css_response = requests.get(css_url)
                if css_response.status_code == 200:
                    css_filename = os.path.basename(urllib.parse.urlparse(css_url).path)
                    if not css_filename:
                        css_filename = f"style_{len(os.listdir(css_dir))}.css"
                    
                    css_path = os.path.join(css_dir, css_filename)
                    with open(css_path, 'w', encoding='utf-8') as f:
                        f.write(css_response.text)
                    
                    # Update the link in the HTML
                    link['href'] = f"css/{css_filename}"
            except Exception as e:
                logger.error(f"Error downloading CSS from {css_url}: {str(e)}")
        
        # Process and download JavaScript files
        logger.info("Processing JavaScript files")
        for script in soup.find_all('script', src=True):
            js_url = script.get('src')
            if not js_url:
                continue
            
            # Resolve relative URLs
            if js_url.startswith('//'):
                js_url = parsed_url.scheme + ':' + js_url
            elif not js_url.startswith(('http://', 'https://')):
                if js_url.startswith('/'):
                    js_url = base_url + js_url
                else:
                    js_url = base_url + '/' + js_url
            
            try:
                js_response = requests.get(js_url)
                if js_response.status_code == 200:
                    js_filename = os.path.basename(urllib.parse.urlparse(js_url).path)
                    if not js_filename:
                        js_filename = f"script_{len(os.listdir(js_dir))}.js"
                    
                    js_path = os.path.join(js_dir, js_filename)
                    with open(js_path, 'w', encoding='utf-8') as f:
                        f.write(js_response.text)
                    
                    # Update the script src in the HTML
                    script['src'] = f"js/{js_filename}"
            except Exception as e:
                logger.error(f"Error downloading JavaScript from {js_url}: {str(e)}")
        
        # Process and download image files (only SVG files as per requirements)
        logger.info("Processing SVG images")
        for img in soup.find_all('img', src=True):
            img_url = img.get('src')
            if not img_url or not img_url.lower().endswith('.svg'):
                continue
            
            # Resolve relative URLs
            if img_url.startswith('//'):
                img_url = parsed_url.scheme + ':' + img_url
            elif not img_url.startswith(('http://', 'https://')):
                if img_url.startswith('/'):
                    img_url = base_url + img_url
                else:
                    img_url = base_url + '/' + img_url
            
            try:
                img_response = requests.get(img_url)
                if img_response.status_code == 200 and img_response.headers.get('Content-Type', '').startswith(('image/svg', 'text/xml')):
                    img_filename = os.path.basename(urllib.parse.urlparse(img_url).path)
                    if not img_filename:
                        img_filename = f"image_{len(os.listdir(img_dir))}.svg"
                    
                    img_path = os.path.join(img_dir, img_filename)
                    with open(img_path, 'w', encoding='utf-8') as f:
                        f.write(img_response.text)
                    
                    # Update the image src in the HTML
                    img['src'] = f"images/{img_filename}"
            except Exception as e:
                logger.error(f"Error downloading SVG from {img_url}: {str(e)}")
        
        # Save the updated HTML file
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        driver.quit()
        
        return {
            "success": True,
            "message": "Website cloned successfully",
            "output_dir": output_dir
        }
    
    except WebDriverException as e:
        logger.error(f"WebDriver error: {str(e)}")
        return {
            "success": False,
            "error": f"WebDriver error: {str(e)}"
        }
    except Exception as e:
        logger.error(f"Error cloning website: {str(e)}")
        return {
            "success": False,
            "error": f"Error cloning website: {str(e)}"
        }
    finally:
        # Ensure WebDriver is closed
        try:
            driver.quit()
        except:
            pass
