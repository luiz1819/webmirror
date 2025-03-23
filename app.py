import os
import logging
import uuid
from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash, send_file
import zipfile
import tempfile
import shutil
from web_cloner import clone_website

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev_secret_key")

# Create temp directory for storing cloned websites
TEMP_DIR = os.path.join(tempfile.gettempdir(), "web_cloner")
os.makedirs(TEMP_DIR, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/clone', methods=['POST'])
def clone():
    url = request.form.get('url')
    if not url:
        flash('Please enter a valid URL', 'danger')
        return redirect(url_for('index'))
    
    # Generate a unique ID for this cloning session
    session_id = str(uuid.uuid4())
    output_dir = os.path.join(TEMP_DIR, session_id)
    
    try:
        # Clone the website
        result = clone_website(url, output_dir)
        
        if result['success']:
            # Store the session ID and URL in session for preview
            session['clone_session_id'] = session_id
            session['cloned_url'] = url
            flash('Website cloned successfully!', 'success')
            return redirect(url_for('preview'))
        else:
            flash(f'Error cloning website: {result["error"]}', 'danger')
            return redirect(url_for('index'))
    except Exception as e:
        logging.error(f"Exception during cloning: {str(e)}")
        flash(f'An error occurred: {str(e)}', 'danger')
        return redirect(url_for('index'))

@app.route('/preview')
def preview():
    session_id = session.get('clone_session_id')
    original_url = session.get('cloned_url')
    
    if not session_id:
        flash('No cloned website found', 'warning')
        return redirect(url_for('index'))
    
    clone_dir = os.path.join(TEMP_DIR, session_id)
    
    if not os.path.exists(clone_dir):
        flash('Cloned files not found', 'warning')
        return redirect(url_for('index'))
    
    # Get a list of files in the cloned directory for display
    file_structure = []
    for root, dirs, files in os.walk(clone_dir):
        rel_path = os.path.relpath(root, clone_dir)
        if rel_path == '.':
            rel_path = ''
        
        for file in files:
            file_path = os.path.join(rel_path, file)
            file_structure.append(file_path)
    
    # Sort files to organize them - HTML first, then CSS, then JS, then others
    sorted_files = sorted(file_structure, key=lambda x: (
        0 if x.endswith('.html') else 
        1 if x.endswith('.css') else 
        2 if x.endswith('.js') else 3,
        x
    ))
    
    return render_template('preview.html', 
                         files=sorted_files, 
                         session_id=session_id,
                         original_url=original_url)

@app.route('/download')
def download():
    session_id = session.get('clone_session_id')
    original_url = session.get('cloned_url', 'website')
    
    if not session_id:
        flash('No cloned website found', 'warning')
        return redirect(url_for('index'))
    
    clone_dir = os.path.join(TEMP_DIR, session_id)
    
    if not os.path.exists(clone_dir):
        flash('Cloned files not found', 'warning')
        return redirect(url_for('index'))
    
    try:
        # Create a zip file of the cloned website
        zip_filename = f"{original_url.replace('://', '_').replace('/', '_').replace('.', '_')}.zip"
        zip_path = os.path.join(TEMP_DIR, zip_filename)
        
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(clone_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, clone_dir)
                    zipf.write(file_path, arcname)
        
        return send_file(zip_path, as_attachment=True, download_name=zip_filename)
    
    except Exception as e:
        logging.error(f"Exception during download: {str(e)}")
        flash(f'Error creating download: {str(e)}', 'danger')
        return redirect(url_for('preview'))

@app.route('/view_file/<session_id>/<path:file_path>')
def view_file(session_id, file_path):
    clone_dir = os.path.join(TEMP_DIR, session_id)
    full_path = os.path.join(clone_dir, file_path)
    
    if not os.path.exists(full_path) or not os.path.isfile(full_path):
        return jsonify({"error": "File not found"}), 404
    
    with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Determine content type based on file extension
    content_type = "text/plain"
    if file_path.endswith('.html'):
        content_type = "text/html"
    elif file_path.endswith('.css'):
        content_type = "text/css"
    elif file_path.endswith('.js'):
        content_type = "text/javascript"
    
    return jsonify({
        "content": content,
        "content_type": content_type
    })

@app.route('/clear')
def clear_session():
    session_id = session.get('clone_session_id')
    if session_id:
        clone_dir = os.path.join(TEMP_DIR, session_id)
        if os.path.exists(clone_dir):
            try:
                shutil.rmtree(clone_dir)
            except Exception as e:
                logging.error(f"Error removing directory: {str(e)}")
    
    session.clear()
    flash('Session cleared', 'info')
    return redirect(url_for('index'))

# Cleanup old cloned websites (in a production app, this would be a scheduled task)
@app.before_request
def cleanup_old_dirs():
    # Skip cleanup for most requests to improve performance
    if request.endpoint != 'index':
        return
    
    try:
        for dir_name in os.listdir(TEMP_DIR):
            dir_path = os.path.join(TEMP_DIR, dir_name)
            if os.path.isdir(dir_path):
                # Check if the directory is more than 1 hour old
                dir_age = os.path.getmtime(dir_path)
                if (os.time.time() - dir_age) > 3600:  # 1 hour in seconds
                    shutil.rmtree(dir_path)
    except Exception as e:
        logging.error(f"Error during cleanup: {str(e)}")
