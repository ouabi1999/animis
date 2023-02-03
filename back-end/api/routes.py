from flask import  Flask, Blueprint, jsonify, request, json, current_app
import os 
from PIL import Image
import base64
import io
from api import db, socketio
from werkzeug.utils import secure_filename
from .models import (
    Users,
    Products, 
    user_serializer,
    productInfo_serializer,
    orders_serializer,
    ratings_serializer,
    Orders, 
    Ratings,
    Messages, 
    messages_serializer,
    Rooms,
    user_room,
    Display,
    display_serializer
        )

from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room

views = Blueprint("views", __name__)

ALLOWED_EXTENSIONS = set({ 'png', 'jpg', 'jpeg', 'gif'})
def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@views.route("/customers", methods=['GET'])
def Home():
    return jsonify([*map(user_serializer, Users.query.all())])

@views.route("/productsinfo", methods=['GET'])
def productsinfo():
    return jsonify([*map(productInfo_serializer, Products.query.all())])

@views.route("/products", methods=["POST"])
def products():
    #print(request.files.getlist("files"))
    shipping_price = request.form.getlist("shipping_price")
    shipping_type = request.form.getlist("shipping_type")
    shipping_delivery = request.form.getlist("shipping_delivery")
    """files = request.files.getlist("files")
    images = []
    for file in files:
        if file and allowed_file(file.filename):
            #extension = file.filename.lower().split(".")[-1]
            filename = secure_filename(file.filename)
            file.save(os.path.join(current_app.config["PRODUCTS_IMAGES"], filename))
            img = Image.open(current_app.config["PRODUCTS_IMAGES"] +"/"+ filename)
            data = io.BytesIO()
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
                img.save(data,"JPEG")
            img.save(data,"JPEG")
            encode_img_data = base64.b64encode(data.getvalue())
            images.append(encode_img_data.decode("UTF-8"))
    
"""
    newproducts = Products(
    title = request.form["title"],
    series = request.form["series"],
    sizes = request.form.getlist("sizes"),
    colors = request.form.getlist("colors"),
    tags = request.form.getlist("tags"),
    price = request.form["price"],
    discount = request.form["discount"],
    quantity = request.form["quantity"],
    description = request.form["description"],
    reviews = request.form["reviews"],
    availability = request.form["availability"],
    category = request.form["category"],
    product_type = request.form["product_type"],
    pics_info =  request.form.getlist("pics_info"),
    shipping_Method = json.loads(request.form["shipping_Method"]),
    seo =    request.form["seo"],
    coupon = request.form["coupon"],   
    
) 
    db.session.add(newproducts)
    db.session.commit()
    return jsonify([*map(productInfo_serializer, Products.query.all())])



#get specific product
@views.route("/product/<id>", methods=["GET"])
def get_product(id):
    product = Products.query.filter_by(id = id).first()
    rats = [*map(ratings_serializer , (product.ratings))]
 
    return{
        "id":product.id,
        "title":product.title,
        "sizes": product.sizes,
        "colors": product.colors,
        "price": product.price,
        "discount":product.discount,
        "quantity": product.quantity,
        "description": product.description,
        "reviews": product.reviews,
        "availability":product.availability,
        "category":product.category,
        "tags":product.tags,
        "product_type": product.product_type,
        "pics_info" : product.pics_info,
        "shippingInfo" : product.shipping_Method,
        "seo" : product.seo,
        "series":product.series,
        "ratings" : rats #str([*map(ratings_serializer, rats)])}  
    }


#delete specific product
@views.route('/delete/<id>',methods=['DELETE'])
def delet_product(id):
    product = Products.query.filter_by(id = id).first()
    db.session.delete(product)
    db.session.commit()
    return ("Product deleted secssefully")
        
# edit a product
@views.route('/editproduct/<id>',methods=['PUT'])
def edit_product(id):
    product  = Products.query.filter_by(id = id)
    if product is not None:

        product.update(dict(
            title = request.form["title"],
            product_type = request.form["product_type"],
            colors = request.form.getlist("colors"),
            sizes = request.form.getlist("sizes"),
            tags = request.form.getlist("tags"),
            price = request.form["price"],
            discount = request.form["discount"],
            quantity = request.form["quantity"],
            description = request.form["description"],
            reviews = request.form["reviews"],
            availability = request.form["availability"],
            category = request.form["category"],
            pics_info = request.form.getlist("pics_info"),
            shipping_Method = json.loads(request.form["shipping_Method" ]), 
            coupon = request.form["coupon"],
            series = request.form["series"]

   
           )
            )
        db.session.commit()
        return jsonify(*map(productInfo_serializer, product))
    else:
        return {"error" : "the product isn't exist any more ..."} ,401 

@views.route("/ratings",methods = ["POST"])
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

    




"""@socketio.on("connect")
def connected():
    #event listener when client connects to the server
    print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})
"""
@socketio.on('message')
def handle_message(message):
    sender = message["sender"]
    receiver = message["receiver"]
    room_id = message["room_id"]
    message = message["text"]

    room = Rooms.query.filter(Rooms.sender.in_([sender, receiver])).filter(Rooms.receiver.in_([sender, receiver ])).first()

    new_message = Messages(
            message = message,
            sender = sender,
            receiver = receiver,
            room_id = room_id
        
        )
  
    db.session.add(new_message)
    db.session.commit()
    emit('newMessage', 
            {"newMessage": {
                "id": new_message.id,
                "message" : new_message.message,
                "is_Read" : new_message.is_Read,
                "room_id"   : new_message.room_id,
                "sender" : new_message.sender,
                "receiver": new_message.receiver,
                "created_at" :json.dumps(new_message.created_at),
            }

            } , broadcast=True)
   
    

"""@socketio.on("disconnect")
def disconnected(data):
    #event listener when client disconnects to the server
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)
"""
@socketio.on('join_room')
def on_join(data):
    sender = data["owner_id"]
    receiver = data["receiver_id"]
    user = Users.query.filter_by(id = sender).first()
    room = Rooms.query.filter(Rooms.sender.in_([sender, receiver])).filter(Rooms.receiver.in_([sender, receiver ])).first()
    if room is not None:
        join_room(data["owner_id"])
        #send({"room_id" : room.id ,'owner_id': owner_id, "receiver_id": receiver_id}, to=room)
        emit('open_room', {"room_id" : room.id ,'owner_id': room.sender, "receiver_id": room.receiver})
        
    else:
        join_room(data["owner_id"])
       
       
        new_room = Rooms(
            sender  =  sender,
            receiver =   receiver,
        )
        
        db.session.add(new_room)
        db.session.commit()
        Room1 = user_room.insert().values(user_id = sender, room_id = new_room.id)
        Room2 = user_room.insert().values(user_id = receiver, room_id = new_room.id)
        db.session.execute(Room1)
        db.session.execute(Room2)
        db.session.commit()
        emit('open_room', {"room_id" : new_room.id ,'owner_id': new_room.sender, "receiver_id": new_room.receiver, "messages": [] })
  


@views.route("/getMessages/<id>", methods=["GET"])
def get_messages(id):
    room = Rooms.query.filter_by(id = id).first()
    if room is None:

        return {"messages":[]}
   
    user_messages =  [*map(messages_serializer , room.messages)]
    return {"messages":user_messages}


@views.route("/getMessages", methods=["GET"])
def get_all_messages():
   
    messages =  [*map(messages_serializer , Messages.query.all())]
    return {"messages":messages}


@socketio.on("readMessage")
def readMessage(data):
    room_id = data["room_id"]
    sender = data["sender"]
    receiver = data["receiver"]
    room = Rooms.query.filter_by(id = room_id).first()
    if room is not None: 
        for msg in room.messages:
            if msg.sender != sender and msg.sender == receiver:
                msg.is_Read = True      
    db.session.commit()
    user_messages =  [*map(messages_serializer , room.messages)]
    emit('seenMessages', {"receiver" : receiver, "sender"  : sender, "room_id"  : room_id, "messages":user_messages}, broadcast=True)


  

  

    
    
    
 
@socketio.on("msgnotification")
def msg_notification(notify):

    emit("notification", {} ,broadcast=True)

  
    

    



@views.route("/displayInfo", methods=['GET'])
def displayInfo():
    return jsonify(*map(display_serializer, Display.query.all()))





@views.route("/display", methods=["POST"])
def display():
    newDisplay = Display(
       logo =  request.form["logo"],
       header = json.loads(request.form["header"]),
       main_category = json.loads(request.form["main_category"]),
       category = json.loads(request.form["category"]),
       banners = json.loads(request.form["banners"]),
       slider = json.loads(request.form["slider"]),
       pop_up = json.loads(request.form["pop_up"]),
       count_Down = request.args.get("count_Down", type = bool)
        
    
        )
    db.session.add(newDisplay)
    db.session.commit()
    return jsonify(*map(display_serializer, newDisplay))



@views.route('/updatedisplay/<id>',methods=['PUT'])
def editDisplay(id):
    display  = Display.query.filter_by(id = id)
    if display is not None:

        display.update(dict(
       
            logo =  request.form["logo"],
            header = json.loads(request.form["header"]),
            main_category = json.loads(request.form["main_category"]),
            category = json.loads(request.form["category"]),
            banners = json.loads(request.form["banners"]),
            slider = json.loads(request.form["slider"]),
            pop_up = json.loads(request.form["pop_up"]),
            count_Down = bool(request.form["count_Down"])
            
           ) ) 
    
            
        
        db.session.commit()
        return jsonify(*map(display_serializer, display))
    else:
        return {"error" : "the product isn't exist any more ..."} ,401 


@views.route("/getRoom", methods=["POST"])
def joingUserRoom():
    data = json.loads(request.data)
    sender = data["owner_id"]
    receiver = data["receiver_id"]
    room = Rooms.query.filter(Rooms.sender.in_([sender, receiver])).filter(Rooms.receiver.in_([sender, receiver ])).first()
    if room is not None:
        
        #send({"room_id" : room.id ,'owner_id': owner_id, "receiver_id": receiver_id}, to=room)
        return {"room_id" : room.id ,'owner_id': room.sender, "receiver_id": room.receiver}
        
    else:
      
        new_room = Rooms(
            sender  =  sender,
            receiver =   receiver,
        )
        #user.room.append(new_room)

        db.session.add(new_room)
        db.session.commit()
        Room1 = user_room.insert().values(user_id = sender, room_id = new_room.id)
        Room2 = user_room.insert().values(user_id = receiver, room_id = new_room.id)
        db.session.execute(Room1)
        db.session.execute(Room2)
        db.session.commit()
        return{"room_id" : new_room.id ,'owner_id': new_room.sender, "receiver_id": new_room.receiver, "messages": [] }
  