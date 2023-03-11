from flask  import Blueprint, jsonify, request, json, session
from api import db
from ..models.models import Users, user_serializer, orders_serializer
from api  import bcrypt, server_session


register_route = Blueprint("register_route", __name__)

@register_route.route("/register", methods=["POST"])
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
        countryCode = request_data["countryCode"],
        gender = request_data["gender"],
        birthDate = request_data["birthDate"]    
    )

    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    orders = [*map(orders_serializer , new_user.userOrders)]
   # messages = [*map(messages_serializer , user.messages)]
    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "firstName": new_user.firstName,
        "lastName" : new_user.lastName,
        "gender" : new_user.gender,
        "birthDate" : new_user.birthDate,
        "avatar" : new_user.userAvatar,
        "country" : new_user.country,
        "countryCode" : new_user.countryCode,
        "joined_at": new_user.joined_at,
        "admin" : new_user.admin,
        "orders" : orders,
        
        
    })