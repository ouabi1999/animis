from flask import  Flask, Blueprint, jsonify, request, json
from  datetime import datetime, timedelta
from ...api import db
from werkzeug.utils import secure_filename
import cloudinary.uploader
from sqlalchemy import desc
from ..models.models import (
   
    Ratings,
    ratings_serializer,
    
)

from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room

ratings_route = Blueprint("ratings_route", __name__ , url_prefix="/")


@ratings_route.route("/ratings",methods = ["POST"])
def rating():
    request_data = json.loads(request.data) #covert data to python dectionerie;
    user_rating = Ratings(
                    product_id = request_data["product_id"],
                    stars = request_data["stars"],
                    comment = request_data["comment"] ,
                    userName = request_data["userName"],
                    userCountry = request_data["country"],
                    userCountryCode = request_data["countryCode"]
                )
    db.session.add(user_rating)
    db.session.commit()
    return {
        "id" : user_rating.id,
        "stars" : user_rating.stars,
        "comment" : user_rating.comment,
        "product_id" : user_rating.product_id,
        "userName" : user_rating.userName,
        "userCountry" : user_rating.userCountry,
        "userCountryCode" :user_rating.userCountryCode,
        "rateDate" : user_rating.rateDate
        
    }