from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    websites = db.relationship('Website', backref='owner', lazy='dynamic')

    def __repr__(self):
        return f'<User {self.username}>'

class Website(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.String(36), nullable=False, index=True)
    url = db.Column(db.String(500), nullable=False)
    domain = db.Column(db.String(255), nullable=False)
    directory = db.Column(db.String(255), nullable=False)
    file_count = db.Column(db.Integer, default=0)
    size_bytes = db.Column(db.BigInteger, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    is_public = db.Column(db.Boolean, default=True)
    
    __table_args__ = (
        db.UniqueConstraint('tenant_id', 'directory', name='uq_tenant_directory'),
    )
    
    def __repr__(self):
        return f'<Website {self.domain}>'
    
    @property
    def size_mb(self):
        """Return size in MB"""
        return round(self.size_bytes / (1024 * 1024), 2)