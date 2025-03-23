import os
import logging
from flask import Flask, render_template, request, jsonify, send_file, redirect, url_for, flash
import urllib.parse
import shutil
import zipfile
import tempfile
from werkzeug.utils import secure_filename
from utils.scraper import clone_website, validate_url

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default-dev-secret-key")

# Create a directory to store cloned websites if it doesn't exist
if not os.path.exists('cloned_sites'):
    os.makedirs('cloned_sites')

@app.route('/')
def index():
    """Render the home page with the URL input form"""
    return render_template('index.html')

@app.route('/clone', methods=['POST'])
def clone():
    """Clone a website based on the provided URL"""
    url = request.form.get('url', '')
    
    if not url:
        flash('Please enter a URL', 'danger')
        return redirect(url_for('index'))
    
    # Validate URL
    is_valid, message = validate_url(url)
    if not is_valid:
        flash(message, 'danger')
        return redirect(url_for('index'))
    
    try:
        # Prepare a unique folder name for the cloned site
        parsed_url = urllib.parse.urlparse(url)
        domain = parsed_url.netloc
        site_dir = secure_filename(domain)
        
        # Create directory for this clone
        target_dir = os.path.join('cloned_sites', site_dir)
        if os.path.exists(target_dir):
            # Clean up existing directory
            shutil.rmtree(target_dir)
        
        # Clone the website
        clone_result = clone_website(url, target_dir)
        
        if clone_result['success']:
            flash('Website cloned successfully!', 'success')
            return redirect(url_for('preview', site_dir=site_dir))
        else:
            flash(f'Error cloning website: {clone_result["message"]}', 'danger')
            return redirect(url_for('index'))
            
    except Exception as e:
        logger.error(f"Clone error: {str(e)}", exc_info=True)
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('index'))

@app.route('/preview/<site_dir>')
def preview(site_dir):
    """Show a preview of the cloned website"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)
    
    if not os.path.exists(target_dir):
        flash('The requested site clone does not exist', 'danger')
        return redirect(url_for('index'))
    
    # Find the main HTML file
    index_path = os.path.join(target_dir, 'index.html')
    if not os.path.exists(index_path):
        # Look for any HTML file
        html_files = [f for f in os.listdir(target_dir) if f.endswith('.html')]
        if html_files:
            index_path = os.path.join(target_dir, html_files[0])
        else:
            flash('No HTML file found in the cloned site', 'danger')
            return redirect(url_for('index'))
    
    # Get file stats
    file_count = sum(len(files) for _, _, files in os.walk(target_dir))
    size_bytes = sum(os.path.getsize(os.path.join(root, file)) 
                    for root, _, files in os.walk(target_dir) 
                    for file in files)
    size_mb = size_bytes / (1024 * 1024)
    
    return render_template('preview.html', 
                          site_dir=site_dir, 
                          file_count=file_count,
                          size_mb=round(size_mb, 2))

@app.route('/download/<site_dir>')
def download(site_dir):
    """Download the cloned website as a zip file"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)
    
    if not os.path.exists(target_dir):
        flash('The requested site clone does not exist', 'danger')
        return redirect(url_for('index'))
    
    # Create a zip file from the directory
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.zip')
    temp_file.close()
    
    with zipfile.ZipFile(temp_file.name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(target_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, 'cloned_sites')
                zipf.write(file_path, arcname)
    
    return send_file(temp_file.name, 
                    as_attachment=True, 
                    download_name=f"{site_dir}.zip")

@app.route('/view/<site_dir>/<path:file_path>')
def view_file(site_dir, file_path):
    """View a specific file from the cloned website"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)
    file_path = os.path.join(target_dir, file_path)
    
    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        flash('The requested file does not exist', 'danger')
        return redirect(url_for('preview', site_dir=site_dir))
    
    return send_file(file_path)

@app.route('/delete/<site_dir>', methods=['POST'])
def delete(site_dir):
    """Delete a cloned website"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)
    
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
        flash('Website clone deleted successfully', 'success')
    else:
        flash('The requested site clone does not exist', 'danger')
    
    return redirect(url_for('index'))

@app.errorhandler(404)
def page_not_found(e):
    flash('Page not found', 'danger')
    return redirect(url_for('index'))

@app.errorhandler(500)
def server_error(e):
    flash('Server error: ' + str(e), 'danger')
    return redirect(url_for('index'))
