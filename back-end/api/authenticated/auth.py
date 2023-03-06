from flask  import Blueprint, jsonify, request, json, session

from ..models.models import Users, user_serializer,messages_serializer, orders_serializer, Messages, Rooms
from api import bcrypt, server_session


auth_route = Blueprint("auth_route", __name__)

@auth_route.route("/auth")
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
        "gender" : user.gender,
        "birthDate" : user.birthDate,
        "avatar" : user.userAvatar,
        "country" : user.country,
        "countryCode" : user.countryCode,
        "joined_at": user.joined_at,
        "admin" : user.admin,
        "orders" : orders,  
    }) 