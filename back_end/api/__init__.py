from flask import Flask, Blueprint
from flask_bcrypt import Bcrypt
from flask_session import Session
import cloudinary 
from flask_cors import  cross_origin, CORS
from flask_migrate import Migrate
from os import path
import stripe
from flask_socketio import SocketIO
from flask_talisman import Talisman
import os
from flask_mail import Mail
from sqlalchemy import text
from ..config import  Config, DevConfig, ProdConfig, db




############################################
############################################

############################################
############################################


bcrypt = Bcrypt()
cors = CORS()
socketio = SocketIO()
basedir = os.path.abspath(os.path.dirname(__file__))
migrate = Migrate()
server_session = Session()
mail = Mail()  
talisman = Talisman()
cloudinary.config(
    cloud_name= os.environ.get("CLOUD_NAME"),
    api_key= os.environ.get("API_KEY"),
    api_secret= os.environ.get("API_SECRET")
  )
def create_app(config_class=ProdConfig):
    
    app = Flask(__name__,  static_folder="../../front-end/build", static_url_path='/', instance_relative_config=False) 
   
    app.config.from_object(config_class)
    bcrypt.init_app(app)
    socketio.init_app(app, cors_allowed_origins = "*")
    cors.init_app(app, supports_credentials=True)
    migrate.init_app(app, db)
    mail.init_app(app)
    server_session.init_app(app)
    db.init_app(app)
    talisman.init_app(app, content_security_policy=None)
   

    
    

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
    from .views.setRatings import ratings_route
    
    app.register_blueprint(shopping_cart_route)
    app.register_blueprint(products_route)
    app.register_blueprint(display_route)
    app.register_blueprint(customers_route)
    app.register_blueprint(getOrderdProducts_route)
    app.register_blueprint(product_filters_route)
    app.register_blueprint(ratings_route)
    
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


