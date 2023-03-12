from flask  import Blueprint, jsonify, request, json, session
from ...api import db, mail, bcrypt, server_session
from models.models import Users, user_serializer, orders_serializer


updateUser_info_route = Blueprint("updateUser_info_route", __name__)



@updateUser_info_route.route('/update-user/<id>',methods=['PUT'])
def updateUser(id):
    user  = Users.query.filter_by(id = id)
  

    if user is not None:
        
        user.update(dict(
            country = request.form["country"],
            firstName = request.form["firstName"],
            lastName  = request.form["lastName"],
            gender = request.form["gender"],
            userAvatar = request.form["userAvatar"],
            countryCode = request.form["countryCode"],

           
         ) ) 
    
        
        db.session.commit()
        return jsonify(*map(user_serializer, user))
    else:
        return {"error" : "the user isn't exist any more ..."} ,401 


@updateUser_info_route.route('/update-user-email/<id>',methods=['PUT'])
def updateUserEmail(id):
    user  = Users.query.filter_by(id = id).first()
    email = request.form["email"]
    userExist = Users.query.filter_by(email = email).first()
    if userExist is not None and user.email != email :
        return jsonify({"error": "this email is already exist"}), 401

    if user is not None:
        
        user.email = request.form["email"]

           
       
    
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