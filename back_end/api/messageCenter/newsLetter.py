from flask import  Flask, Blueprint, jsonify, request, json, current_app
import os 
from PIL import Image
import base64
import io
from ...api import db, socketio, mail
from werkzeug.utils import secure_filename
from models.models import Newsletter
   
    
from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room


newsletter_route = Blueprint("newsletter_route", __name__ , url_prefix="/")



@newsletter_route.route("/subscribe-newsletter", methods=["POST"])
def subscribeNewsletter():
    data = json.loads(request.data)
    email = data["email"]
    newsletter = Newsletter.query.filter_by(email = email ).first()
    if email == "":
        return {"error": "email should not be empty "}, 401
    if newsletter is not None:
        return {"error": "already subscribed "}, 401
   

    new_newsletter = Newsletter(email = email)
    db.session.add(new_newsletter)
    db.session.commit()
    return {"resulte": "subscribed succesfully"},200 