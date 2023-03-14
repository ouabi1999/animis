from flask import  Flask, Blueprint, jsonify, request, json
import os 
from PIL import Image
import base64
import io
from ...api import db, socketio, mail
from werkzeug.utils import secure_filename
from ..models.models import  Users, user_serializer
    


customers_route = Blueprint("customers_route", __name__ , url_prefix="/")

@customers_route.route("/customers", methods=['GET'])
def Home():
    return jsonify([*map(user_serializer, Users.query.all())])