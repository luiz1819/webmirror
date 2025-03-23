import os
import logging
from flask import Flask, render_template, request, jsonify, send_file, redirect, url_for, flash
from models import db, User, Website
import urllib.parse
import shutil
import zipfile
import tempfile
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from utils.scraper import clone_website, validate_url
from models import db, User, Website
from forms import LoginForm, RegistrationForm

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default-dev-secret-key")

# Configure a URL do banco de dados PostgreSQL
database_url = os.environ.get("DATABASE_URL")
if database_url:
    # Se o DATABASE_URL estiver definido, use-o
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "pool_recycle": 300,
        "pool_pre_ping": True,
    }
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    logger.info("Database connection configured with DATABASE_URL")

# Initialize extensions
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))

# Create database tables
with app.app_context():
    db.create_all()

# Create a directory to store cloned websites if it doesn't exist
if not os.path.exists('cloned_sites'):
    os.makedirs('cloned_sites')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """User login page"""
    if current_user.is_authenticated:
        return redirect(url_for('user_sites'))

    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not check_password_hash(user.password_hash, form.password.data):
            flash('Invalid email or password', 'danger')
            return redirect(url_for('login'))

        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or urllib.parse.urlparse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)

    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    """User logout"""
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    """User registration page"""
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.password_hash = generate_password_hash(form.password.data)
        db.session.add(user)
        db.session.commit()

        flash('Congratulations, you are now a registered user!', 'success')
        return redirect(url_for('login'))

    return render_template('register.html', title='Register', form=form)

@app.route('/')
def landing():
    """Render the landing page"""
    return render_template('landing.html')

@app.route('/index')
@login_required
def index():
    """Redirect to dashboard"""
    return redirect(url_for('dashboard'))

@app.route('/site-builder')
@login_required
def site_builder():
    """Render the site builder page"""
    return render_template('site_builder.html')

@app.route('/dashboard')
@login_required
def dashboard():
    """Render the dashboard page with statistics"""
    try:
        # Get user's recent websites
        recent_websites = Website.query.filter_by(user_id=current_user.id)\
            .order_by(Website.created_at.desc())\
            .limit(5)\
            .all()
        return render_template('dashboard.html', recent_websites=recent_websites, Website=Website)
    except Exception as e:
        flash(f'Erro ao carregar dashboard: {str(e)}', 'danger')
        return redirect(url_for('landing'))

    # Try using Supabase first
    try:
        from utils.supabase_client import get_recent_websites
        # Get current user's websites from Supabase
        if current_user.is_authenticated:
            tenant_id = str(current_user.id)
            supabase_websites = get_recent_websites(limit=5, tenant_id=tenant_id)
        else:
            supabase_websites = []

        if supabase_websites:
            # Convert to Website objects
            for website_data in supabase_websites:
                website = Website(
                    url=website_data.get('url', ''),
                    domain=website_data.get('domain', ''),
                    directory=website_data.get('directory', ''),
                    file_count=website_data.get('file_count', 0),
                    size_bytes=website_data.get('size_bytes', 0),
                    created_at=website_data.get('created_at')
                )
                recent_websites.append(website)
            logger.info(f"Retrieved {len(recent_websites)} websites from Supabase")
    except Exception as supabase_error:
        logger.error(f"Error retrieving websites from Supabase: {str(supabase_error)}")

        # Fall back to PostgreSQL if Supabase fails
        try:
            if current_user.is_authenticated:
                recent_websites = Website.query.filter_by(user_id=current_user.id).order_by(Website.created_at.desc()).limit(5).all()
            else:
                recent_websites = Website.query.order_by(Website.created_at.desc()).limit(5).all()
            logger.info(f"Retrieved {len(recent_websites)} websites from PostgreSQL")
        except Exception as pg_error:
            logger.error(f"Error retrieving websites from PostgreSQL: {str(pg_error)}")

    return render_template('dashboard.html', recent_websites=recent_websites)

@app.route('/sites')
@login_required
def user_sites():
    """View all user's cloned websites"""
    websites = []

    # Try Supabase first
    try:
        from utils.supabase_client import get_user_websites
        supabase_websites = get_user_websites(tenant_id=str(current_user.id))

        if supabase_websites:
            # Convert to Website objects
            for website_data in supabase_websites:
                website = Website(
                    url=website_data.get('url', ''),
                    domain=website_data.get('domain', ''),
                    directory=website_data.get('directory', ''),
                    file_count=website_data.get('file_count', 0),
                    size_bytes=website_data.get('size_bytes', 0),
                    created_at=website_data.get('created_at')
                )
                websites.append(website)
    except Exception as e:
        logger.error(f"Error retrieving user websites from Supabase: {str(e)}")

        # Fall back to PostgreSQL
        try:
            websites = Website.query.filter_by(user_id=current_user.id).order_by(Website.created_at.desc()).all()
        except Exception as pg_error:
            logger.error(f"Error retrieving user websites from PostgreSQL: {str(pg_error)}")

    return render_template('user_sites.html', websites=websites)

@app.route('/profile')
@login_required
def profile():
    """User profile page with statistics"""
    if not current_user.is_authenticated:
        return redirect(url_for('landing'))
    from sqlalchemy import func
    return render_template('profile.html', func=func, Website=Website)

@app.route('/clone', methods=['POST'])
@login_required
def clone():
    """Clone a website based on the provided URL"""
    url = request.form.get('url', '')

    if not url:
        flash('Por favor, insira uma URL', 'danger')
        return redirect(url_for('dashboard'))

    # Validate URL
    is_valid, message = validate_url(url)
    if not is_valid:
        flash(message, 'danger')
        return redirect(url_for('dashboard'))

    try:
        # Prepare a unique folder name for the cloned site
        parsed_url = urllib.parse.urlparse(url)
        domain = parsed_url.netloc
        base_dir = secure_filename(domain)
        
        # Find a unique directory name
        counter = 1
        site_dir = base_dir
        while Website.query.filter_by(directory=site_dir).first() is not None:
            site_dir = f"{base_dir}_{counter}"
            counter += 1

        # Create directory for this clone
        target_dir = os.path.join('cloned_sites', site_dir)
        if os.path.exists(target_dir):
            # Clean up existing directory
            shutil.rmtree(target_dir)

        # Clone the website
        clone_result = clone_website(url, target_dir)

        if clone_result['success']:
            # Calculate stats
            file_count = sum(len(files) for _, _, files in os.walk(target_dir))
            size_bytes = sum(os.path.getsize(os.path.join(root, file)) 
                            for root, _, files in os.walk(target_dir) 
                            for file in files)

            try:
                # Create website record in both PostgreSQL and Supabase
                website = Website(
                    url=url,
                    domain=domain,
                    directory=site_dir,
                    file_count=file_count,
                    size_bytes=size_bytes,
                    user_id=current_user.id if current_user.is_authenticated else None,
                    is_public=True
                )

                # Add to PostgreSQL
                db.session.add(website)
                db.session.commit()

                # Add to Supabase
                from utils.supabase_client import create_website
                website_data = {
                    'tenant_id': str(current_user.id),
                    'url': url,
                    'domain': domain,
                    'directory': site_dir,
                    'file_count': file_count,
                    'size_bytes': size_bytes,
                    'user_id': current_user.id,
                    'is_public': True
                }
                create_website(website_data)

            except Exception as e:
                logger.error(f"Error saving website to database: {str(e)}")
                db.session.rollback()
                raise

            flash('Website cloned successfully!', 'success')
            return redirect(url_for('preview', site_dir=site_dir))
        else:
            flash(f'Erro ao clonar o site: {clone_result["message"]}', 'danger')
            return redirect(url_for('dashboard'))

    except Exception as e:
        logger.error(f"Clone error: {str(e)}", exc_info=True)
        flash(f'Ocorreu um erro: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

@app.route('/preview/<site_dir>')
@login_required
def preview(site_dir):
    """Show a preview of the cloned website"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)

    if not os.path.exists(target_dir):
        flash('O site solicitado não existe', 'danger')
        return redirect(url_for('dashboard'))

    # Find the main HTML file
    index_path = os.path.join(target_dir, 'index.html')
    if not os.path.exists(index_path):
        # Look for any HTML file
        html_files = [f for f in os.listdir(target_dir) if f.endswith('.html')]
        if html_files:
            index_path = os.path.join(target_dir, html_files[0])
        else:
            flash('Nenhum arquivo HTML encontrado no site clonado', 'danger')
            return redirect(url_for('dashboard'))

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
@login_required
def download(site_dir):
    """Download the cloned website as a zip file"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)

    if not os.path.exists(target_dir):
        flash('O site solicitado não existe', 'danger')
        return redirect(url_for('dashboard'))

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
@login_required
def view_file(site_dir, file_path):
    """View a specific file from the cloned website"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)
    file_path = os.path.join(target_dir, file_path)

    if not os.path.exists(file_path) or not os.path.isfile(file_path):
        flash('O arquivo solicitado não existe', 'danger')
        return redirect(url_for('preview', site_dir=site_dir))

    return send_file(file_path)

@app.route('/delete/<site_dir>', methods=['POST'])
@login_required
def delete(site_dir):
    """Delete a cloned website"""
    site_dir = secure_filename(site_dir)
    target_dir = os.path.join('cloned_sites', site_dir)

    # Try to delete from Supabase first
    supabase_success = False
    try:
        from utils.supabase_client import delete_website
        supabase_success = delete_website(site_dir)
        if supabase_success:
            logger.info(f"Deleted website {site_dir} from Supabase")
    except Exception as supabase_error:
        logger.error(f"Error deleting website from Supabase: {str(supabase_error)}")

    # Fall back to PostgreSQL if Supabase delete fails
    if not supabase_success:
        try:
            website = Website.query.filter_by(directory=site_dir).first()
            if website:
                db.session.delete(website)
                db.session.commit()
                logger.info(f"Deleted website {site_dir} from PostgreSQL database")
        except Exception as e:
            logger.error(f"Error deleting website from PostgreSQL database: {str(e)}")

    # Delete the files
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
        flash('Site clonado excluído com sucesso', 'success')
    else:
        flash('O site solicitado não existe', 'danger')

    return redirect(url_for('user_sites'))

@app.errorhandler(404)
def page_not_found(e):
    flash('Página não encontrada', 'danger')
    return redirect(url_for('landing'))

@app.errorhandler(500)
def server_error(e):
    flash(f'Erro no servidor: {str(e)}', 'danger')
    return redirect(url_for('landing'))