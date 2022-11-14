from flask  import Blueprint, jsonify, request, json, session
from api import db
from .models import Users, user_serializer,messages_serializer, orders_serializer, Messages, Rooms
from . import bcrypt, server_session


auth = Blueprint("auth", __name__)

@auth.route("/user")
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = Users.query.filter_by(id = user_id).first()
    
    #user_Messages = Messages.query.filter_by(room = user_id).first()
    orders = [*map(orders_serializer , user.userOrders)]
   # messages = [*map(messages_serializer , user.messages)]
    return jsonify({
        "id": user.id,
        "email": user.email,
        "firstName": user.firstName,
        "lastName" : user.lastName,
        "birthDate" : user.birthDate,
        "avatar" : user.userAvatar,
        "country" : user.country,
        "countryCode" : user.countryCode,
        "joined_at": user.joined_at,
        "admin" : user.admin,
        "orders" : orders,
        
        
    }) 

@auth.route("/register", methods=["POST"])
def register():
    request_data = json.loads(request.data)
    email = request_data["email"]
    password = request_data["password"]
    user_exist = Users.query.filter_by(email = email).first()

    if user_exist is not None:
        return {"error" : "User already exist please choose another email "}
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8") 

    new_user = Users(
        email = email,
        password = hashed_password, 
        firstName = request_data["firstName"],
        lastName = request_data["lastName"],
        country = request_data["country"],
        gender = request_data["gender"],
        birthDate = request_data["birthDate"]    
    )

    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    return {"user": new_user.firstName}


@auth.route("/login", methods=["POST"])
def login():
    request_data = json.loads(request.data) #covert data to python dectionerie
    email = request_data["email"]
    password = request_data["password"]
    user = Users.query.filter_by(email = email).first()
    if user is None:
        return jsonify({"error": "this email are not valid"}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "email  or password are not valid"}), 401

    session["user_id"] = user.id
    return jsonify({
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "gender": user.gender,
        "country" : user.country,
        "birthDate" : user.birthDate,
        "avatar" : user.userAvatar,
        "admin" : user.admin,
    }) 

@auth.route("/logout", methods = ["POST"])
def logout_user():
    session.clear()
    return "200"


