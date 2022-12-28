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
        "gender" : user.gender,
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
        return jsonify({"error": "this email are not exist"}), 401
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


@auth.route('/update-user-password/<id>',methods=['PUT'])
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

@auth.route('/update-user/<id>',methods=['PUT'])
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


@auth.route('/update-user-email/<id>',methods=['PUT'])
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

