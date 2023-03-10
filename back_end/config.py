import os

from dotenv import load_dotenv


load_dotenv()



class Config():
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SESSION_PERMANENT = True
    SESSION_TYPE = 'sqlalchemy'
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URI')
    SESSION_USE_SIGNER = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
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
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URI')
    SQLALCHEMY_ECHO = False


class DevConfig(Config):
    FLASK_DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI= os.environ.get('DEV_DATABASE_URI')
    SQLALCHEMY_ECHO = True