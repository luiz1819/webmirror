import os
import logging
from supabase import create_client, Client

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Supabase credentials
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = None

def init_supabase():
    """Initialize the Supabase client"""
    global supabase
    
    try:
        if not supabase_url or not supabase_key:
            logger.error("Supabase credentials are not set")
            return False
        
        supabase = create_client(supabase_url, supabase_key)
        logger.info("Supabase client initialized successfully")
        
        # Initialize tables
        create_user_table()
        create_website_table()
        
        return True
    except Exception as e:
        logger.error(f"Error initializing Supabase client: {str(e)}")
        return False

# User-related functions
def create_user_table():
    """Create users table in Supabase if it doesn't exist"""
    try:
        # Check if the table exists by querying it
        supabase.table('users').select('*').limit(1).execute()
        logger.info("Users table already exists")
        return True
    except Exception:
        # Aqui vamos criar a tabela usando SQL através da função rpc do Supabase
        try:
            # Query para criar a tabela (isso só funciona se você tiver permissões adequadas)
            sql = """
            CREATE TABLE IF NOT EXISTS public.users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(64) NOT NULL UNIQUE,
                email VARCHAR(120) NOT NULL UNIQUE,
                password_hash VARCHAR(256) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
            """
            
            # Executar a query através do Supabase
            try:
                # Primeiro tentamos usar rpc
                supabase.rpc('exec_sql', {'sql': sql}).execute()
                logger.info("Users table created successfully via RPC")
            except Exception as rpc_error:
                logger.error(f"RPC method failed: {str(rpc_error)}")
                # Se rpc falhar, tentamos via REST API (como fallback)
                logger.info("Users table does not exist, creating SQL table via API is not supported")
                logger.info("Please create the table manually in the Supabase dashboard")
                
            return True
        except Exception as e:
            logger.error(f"Error creating users table: {str(e)}")
            return False

def get_user_by_username(username):
    """Get a user by username"""
    try:
        response = supabase.table('users').select('*').eq('username', username).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        logger.error(f"Error getting user by username: {str(e)}")
        return None

def create_user(username, email, password_hash):
    """Create a new user in Supabase"""
    try:
        user_data = {
            'username': username,
            'email': email,
            'password_hash': password_hash
        }
        response = supabase.table('users').insert(user_data).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        logger.error(f"Error creating user: {str(e)}")
        return None

# Website-related functions
def create_website_table():
    """Create websites table in Supabase if it doesn't exist"""
    try:
        # Check if the table exists by querying it
        supabase.table('websites').select('*').limit(1).execute()
        logger.info("Websites table already exists")
        return True
    except Exception:
        # Aqui vamos criar a tabela usando SQL através da função rpc do Supabase
        try:
            # Query para criar a tabela (isso só funciona se você tiver permissões adequadas)
            sql = """
            CREATE TABLE IF NOT EXISTS public.websites (
                id SERIAL PRIMARY KEY,
                url TEXT NOT NULL,
                domain TEXT NOT NULL,
                directory TEXT NOT NULL UNIQUE,
                file_count INTEGER DEFAULT 0,
                size_bytes BIGINT DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                user_id INTEGER,
                is_public BOOLEAN DEFAULT TRUE
            );
            """
            
            # Executar a query através do Supabase
            try:
                # Primeiro tentamos usar rpc
                supabase.rpc('exec_sql', {'sql': sql}).execute()
                logger.info("Websites table created successfully via RPC")
            except Exception as rpc_error:
                logger.error(f"RPC method failed: {str(rpc_error)}")
                # Se rpc falhar, tentamos via REST API (como fallback)
                logger.info("Websites table does not exist, creating SQL table via API is not supported")
                logger.info("Please create the table manually in the Supabase dashboard")
                
            return True
        except Exception as e:
            logger.error(f"Error creating websites table: {str(e)}")
            return False

def get_recent_websites(limit=5, user_id=None):
    """
    Get recent websites from Supabase
    
    Args:
        limit (int): Maximum number of websites to return
        user_id (int, optional): Filter by user ID if provided
        
    Returns:
        list: List of website records
    """
    try:
        query = supabase.table('websites').select('*')
        
        # Filter by user_id if provided
        if user_id:
            query = query.eq('user_id', user_id)
            
        # Order and limit
        response = query.order('created_at', desc=True).limit(limit).execute()
        return response.data
    except Exception as e:
        logger.error(f"Error getting recent websites: {str(e)}")
        return []
        
def get_user_websites(user_id):
    """
    Get all websites for a specific user
    
    Args:
        user_id (int): User ID to filter by
        
    Returns:
        list: List of website records
    """
    try:
        response = supabase.table('websites').select('*').eq('user_id', user_id).order('created_at', desc=True).execute()
        return response.data
    except Exception as e:
        logger.error(f"Error getting user websites: {str(e)}")
        return []

def create_website(website_data):
    """Create a new website record in Supabase"""
    try:
        response = supabase.table('websites').insert(website_data).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        logger.error(f"Error creating website record: {str(e)}")
        return None

def get_website_by_directory(directory):
    """Get a website by its directory name"""
    try:
        response = supabase.table('websites').select('*').eq('directory', directory).execute()
        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        logger.error(f"Error getting website by directory: {str(e)}")
        return None

def delete_website(directory):
    """Delete a website by its directory name"""
    try:
        response = supabase.table('websites').delete().eq('directory', directory).execute()
        return True
    except Exception as e:
        logger.error(f"Error deleting website: {str(e)}")
        return False

# Initialize Supabase connection when this module is imported
init_supabase()