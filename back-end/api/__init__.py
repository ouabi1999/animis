from flask import Flask 
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import  cross_origin, CORS
from flask_migrate import Migrate
from os import path
import stripe

import os
db = SQLAlchemy()
bcrypt = Bcrypt()
cors = CORS()
PRODUCTS_IMAGES = "./images/products_images"
basedir = os.path.abspath(os.path.dirname(__file__))
migrate = Migrate()
server_session = Session()

def create_app():
    app = Flask(__name__)
    bcrypt.init_app(app)
    db.init_app(app)
    cors.init_app(app, supports_credentials=True)
    db.init_app(app)

    migrate.init_app(app, db)
    app.secret_key = "mysecretket"
    app.config['SESSION_PERMANENT'] = True
    app.config['SESSION_TYPE'] = 'sqlalchemy'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
    app.config['SESSION_USE_SIGNER'] = False
    app.config['SESSION_SQLALCHEMY'] = db
    app.config['SQLALCHEMY_ECHO'] = True  
    app.config['PRODUCTS_IMAGES'] = PRODUCTS_IMAGES   
    server_session.init_app(app)
    ################################################
    from  .views import views
    from  .auth import auth
    from  .payment import payment
    app.register_blueprint(views)
    app.register_blueprint(auth)
    app.register_blueprint(payment)
   

    #create_database(app)
    #db.create_all(app = app)
    return app


def create_database(app):
    
    db.create_all(app=app)
    print('Created Database!')