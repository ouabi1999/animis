from flask  import Blueprint, jsonify, request, json, session

from models.models import Users, user_serializer,messages_serializer, orders_serializer, Messages, Rooms
from ...api import bcrypt, server_session, db


login_route = Blueprint("login_route", __name__)

@login_route.route("/login", methods=["POST"])
def login():
    request_data = json.loads(request.data) #covert data to python dectionerie
    email = request_data["email"]
    password = request_data["password"]
    user = Users.query.filter_by(email = email).first()
    if user is None:
        return jsonify({"error": "this email are not exist"}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "email  or password are not valid"}), 401

    session["user_id"] = user.id
    orders = [*map(orders_serializer , user.userOrders)]
    return jsonify({
        "id": user.id,
        "email": user.email,
        "firstName": user.firstName,
        "lastName" : user.lastName,
        "gender" : user.gender,
        "birthDate" : user.birthDate,
        "avatar" : user.userAvatar,
        "country" : user.country,
        "countryCode" : user.countryCode,
        "joined_at": user.joined_at,
        "admin" : user.admin,
        "orders" : orders,  
        }) 
     