from flask  import Blueprint, jsonify, request, json, session
from api import db
from .models import Users, user_serializer
from . import bcrypt, server_session
import stripe

auth = Blueprint("auth", __name__)



@auth.route("/user")
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = Users.query.filter_by(id = user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
        "fullname": user.full_name,
        "birthday" : user.birthday,
        "avatar" : user.userAvatar
    }) 

@auth.route("/register", methods=["POST"])
def register():
    request_data = json.loads(request.data)
    email = request_data["email"]
    password = request_data["password"]
    user_exist = Users.query.filter_by(email = email).first()
    if user_exist is not None:
        return {"409":"the user already exist"}
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = Users(
        full_name = request_data["fullname"],
        email = request_data["email"],
        password = hashed_password,
        birthday = request_data["birthday"]      
    )

    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    return {"user": new_user.full_name}

@auth.route("/login", methods=["POST"])
def login():
    request_data = json.loads(request.data) #covert data to python dectionerie
    email = request_data["email"]
    password = request_data["password"]
    user = Users.query.filter_by(email = email).first()
    if user is None:
        return {"this email are not valid":401},401
    if not bcrypt.check_password_hash(user.password, password):
        return {"password or email are not valid":401},401

    session["user_id"] = user.id
    return jsonify({
        "email": user.email,
        "fullname": user.full_name,
        "birthday" : user.birthday,
        "avatar" : user.userAvatar
    }) 

@auth.route("/logout", methods = ["POST"])
def logout_user():
    session.clear()
    return "200"


