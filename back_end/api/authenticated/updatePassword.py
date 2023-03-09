from flask  import Blueprint, jsonify, request, json, session
from ...api import db
from ..models.models import Users, orders_serializer
from ...api  import bcrypt, server_session


update_Password_route = Blueprint("update_Password_route", __name__)





@update_Password_route.route('/update-user-password/<id>',methods=['PUT'])
def updatePassword(id):
    user  = Users.query.filter_by(id = id).first()
    oldPassword = request.form["oldPassword"]
    newPassword = request.form["newPassword"]

    if user is not None:
        if not bcrypt.check_password_hash(user.password, oldPassword):
            return jsonify({"error": "Old Password are not correct"}), 401

        hashed_password = bcrypt.generate_password_hash(newPassword).decode("utf-8") 
        user.password = hashed_password
       
          
    
        orders = [*map(orders_serializer , user.userOrders)]
        db.session.commit()
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
    else:
        return {"error" : "the user isn't exist any more ..."} ,401