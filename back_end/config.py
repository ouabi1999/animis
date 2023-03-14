import os

from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv


load_dotenv()
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
db = SQLAlchemy()


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SESSION_PERMANENT = True
    SESSION_TYPE = 'sqlalchemy'
    
    SESSION_USE_SIGNER = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_SQLALCHEMY = db
    SQLALCHEMY_POOL_SIZE = 10
    SQLALCHEMY_MAX_OVERFLOW = 30
    
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
     
class ProdConfig(Config):
    FLASK_DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI= os.environ.get('PROD_DATABASE_URL')
    
    SQLALCHEMY_ECHO = False


class DevConfig(Config):
    FLASK_DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URL')
    SQLALCHEMY_ECHO = True