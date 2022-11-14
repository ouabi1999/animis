from flask import Flask 
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import  cross_origin, CORS
from flask_migrate import Migrate
from os import path
import stripe
from flask_socketio import SocketIO

import os
db = SQLAlchemy()
bcrypt = Bcrypt()
cors = CORS()
socketio = SocketIO()
PRODUCTS_IMAGES = "./images/products_images"
basedir = os.path.abspath(os.path.dirname(__file__))
migrate = Migrate()
server_session = Session()

def create_app():
    app = Flask(__name__)
    bcrypt.init_app(app)
    socketio.init_app(app, cors_allowed_origins = "*")
    cors.init_app(app, supports_credentials=True)
    migrate.init_app(app, db)
    app.secret_key = "mysecretket"
    app.config['SESSION_PERMANENT'] = True
    app.config['SESSION_TYPE'] = 'sqlalchemy'
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:mina9991rwina@localhost/corazon_DB"
    app.config['SESSION_USE_SIGNER'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SESSION_SQLALCHEMY'] = db
    app.config['SQLALCHEMY_POOL_SIZE'] = 10
    app.config['SQLALCHEMY_MAX_OVERFLOW'] = 30

    app.config['SQLALCHEMY_ECHO'] = True
    app.config['PRODUCTS_IMAGES'] = PRODUCTS_IMAGES   
    server_session.init_app(app)
    db.init_app(app)
    ################################################
    from  .views import views
    from  .auth import auth
    from  .payment import payment
    app.register_blueprint(views)
    app.register_blueprint(auth)
    app.register_blueprint(payment)

   
    #db.create_all(app)
    db.create_all(app = app)
    return app







