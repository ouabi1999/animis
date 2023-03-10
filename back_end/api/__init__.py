from flask import Flask, Blueprint
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import  cross_origin, CORS
from flask_migrate import Migrate
from os import path
import stripe
from flask_socketio import SocketIO
import os
from flask_mail import Mail
from sqlalchemy import text

from dotenv import load_dotenv


load_dotenv()

############################################
############################################

############################################
############################################

db = SQLAlchemy()
bcrypt = Bcrypt()
cors = CORS()
socketio = SocketIO()
basedir = os.path.abspath(os.path.dirname(__file__))
migrate = Migrate()
server_session = Session()
mail = Mail()
   
  
def create_app():
    app = Flask(__name__,  static_folder="../../front-end/build", static_url_path='/')
    bcrypt.init_app(app)
    socketio.init_app(app, cors_allowed_origins = "*")
    cors.init_app(app, supports_credentials=True)
    migrate.init_app(app, db)
    app.secret_key = os.environ.get('SECRET_KEY')
    app.config['SESSION_PERMANENT'] = True
    app.config['SESSION_TYPE'] = 'sqlalchemy'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SESSION_USE_SIGNER'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SESSION_SQLALCHEMY'] = db
    app.config['SQLALCHEMY_POOL_SIZE'] = 10
    app.config['SQLALCHEMY_MAX_OVERFLOW'] = 30
    app.config['SQLALCHEMY_ECHO'] = True

    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = os.environ.get("MAIL_USERNAME")
    app.config['MAIL_PASSWORD'] = os.environ.get("MAIL_PASSWORD")
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True  
    mail.init_app(app)
    server_session.init_app(app)
    db.init_app(app)

    ############################################
    ############################################
   
    from  .authenticated.auth import auth_route
    from  .authenticated.login import login_route
    from  .authenticated.update_User_Email import update_User_Email_route
    from  .authenticated.resetPassword import resetPassword_route
    from  .authenticated.register import register_route
    from  .authenticated.logout import logout_route
    from  .authenticated.updateUserInfo import updateUser_info_route
    from  .authenticated.updatePassword import update_Password_route
    from  .payment.payment import payment_route
    
    from  .messageCenter.chat import get_messages_route
    from  .messageCenter.contact_us import  contactUs_route
    from  .messageCenter.newsLetter import newsletter_route
    from  .messageCenter.room import get_room_route
    
    #register views  routes
    from .views.products import products_route
    from .views.shoppingCart import shopping_cart_route
    from .views.display import display_route
    from .views.getCustomers import customers_route
    from .views.getOrders import getOrderdProducts_route
    from .views.productFilters import product_filters_route
    
    app.register_blueprint(shopping_cart_route)
    app.register_blueprint(products_route)
    app.register_blueprint(display_route)
    app.register_blueprint(customers_route)
    app.register_blueprint(getOrderdProducts_route)
    app.register_blueprint(product_filters_route)
    
    #register messageCenter routes
    app.register_blueprint(get_messages_route)
    app.register_blueprint(contactUs_route)
    app.register_blueprint(newsletter_route)
    app.register_blueprint(get_room_route)
    
    
    #register authenticited routes
    app.register_blueprint(update_Password_route)
    app.register_blueprint(updateUser_info_route)
    app.register_blueprint(logout_route)
    app.register_blueprint(register_route)
    app.register_blueprint(login_route)
    app.register_blueprint(update_User_Email_route)
    
    app.register_blueprint(auth_route)
    app.register_blueprint(payment_route)
    app.register_blueprint(resetPassword_route)
    
    #db.create_all(app)
    #db.create_all(app = app)
    from .models import models
    
    with app.app_context():
      db.create_all()
        
      ## this code for full text serach   
      """db.session.execute(text("CREATE EXTENSION IF NOT EXISTS unaccent"))
      db.session.execute(text('CREATE TEXT SEARCH CONFIGURATION my_search_conf (COPY = pg_catalog.simple);'))
      db.session.execute(text('ALTER TEXT SEARCH CONFIGURATION my_search_conf ADD MAPPING FOR word, asciiword, hword, asciihword WITH simple, english_stem'))
      db.session.commit()"""
   
    return app


