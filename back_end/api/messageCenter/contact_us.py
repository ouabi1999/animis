from flask import  Flask, Blueprint, jsonify, request, json, current_app
import os 
from PIL import Image
import base64
import io
from ...api import db, socketio, mail
from werkzeug.utils import secure_filename
from ..models.models import  Contact
   
    
from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room


contactUs_route = Blueprint("contactUs_route", __name__ , url_prefix="/")



@contactUs_route.route("/contact-us", methods=["POST"])
def handleContactUsInfo():
    data = json.loads(request.data)
    message = data["message"]
    email = data["email"]
    new_contact = Contact(email = email, message = message)
    db.session.add(new_contact)
    db.session.commit()
    return { "response": "message sent successfully"},200
