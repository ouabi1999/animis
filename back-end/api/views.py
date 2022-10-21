from flask import  Flask, Blueprint, jsonify, request, json, current_app
import os 
from PIL import Image
import base64
import io
from api import db, socketio
from werkzeug.utils import secure_filename
from .models import Users, Products, user_serializer, productInfo_serializer, orders_serializer, ratings_serializer, Orders, Ratings,notification_serializer, MessageNotification , Messages, messages_serializer, Rooms
from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room

from api import create_app
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
    product_images = request.form.getlist("images"),
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
    pics_info =  request.form["pics_info"],
    shipping_Method = json.loads(request.form["shipping_Method"]),
    seo =    request.form["seo"],
    
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
        "product_images": product.product_images,
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
    images = request.form.getlist("pics")
    product.update(dict(
        title = request.form["title"],
        product_images = images,
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
    )
    )
    db.session.commit()
    return jsonify(*map(productInfo_serializer, product))

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
    return jsonify([*map(ratings_serializer, Ratings.query.all())])
    
@views.route("/getratings",methods = ["GET"])
def getrating():
    return jsonify([*map(ratings_serializer, Ratings.query.all())])



@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on('message')
def handle_message(message):
    sender = message["owner_id"]
    receiver = message["receiver_id"]
    room_id = message["room_id"]
    message = message["text"]

    user_room = Rooms.query.filter(Rooms.sender.in_([sender, receiver])).filter(Rooms.receiver.in_([sender, receiver ])).first()

    user_messages = {
        "sender" : sender,
        "receiver" : receiver,
        "room_id" : room_id,
        "message" : message

    }

    new_message = Messages(
            message = message,
            sender = sender,
            receiver = receiver,
            room_id = room_id
        
        )
    new_notification = MessageNotification(
            notification = message,
            sender = sender,
            receiver_id = receiver,
            room_id = room_id 
           
        
        )
    
    db.session.add(new_notification)
    db.session.add(new_message)
    db.session.commit()
    emit('messages', {"messages": user_messages, "notification" : user_messages  }, broadcast=True)
   
    

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

@socketio.on('join_room')
def on_join(data):
    sender = data["owner_id"]
    receiver = data["receiver_id"]
    user_room = Rooms.query.filter(Rooms.sender.in_([sender, receiver])).filter(Rooms.receiver.in_([sender, receiver ])).first()
    if user_room is not None:
        db.session.commit()
        join_room(data["owner_id"])
        #send({"room_id" : user_room.id ,'owner_id': owner_id, "receiver_id": receiver_id}, to=room)
        emit('open_room', {"room_id" : user_room.id ,'owner_id': user_room.sender, "receiver_id": user_room.receiver}, broadcast=True)
        
    else:
        join_room(data["owner_id"])
        new_room = Rooms(
            sender  =  sender,
            receiver =   receiver,
        )
        #user.room.append(new_room)
        db.session.add(new_room)
        db.session.commit()
        emit('open_room', {"room_id" : new_room.id ,'owner_id': new_room.sender, "receiver_id": new_room.receiver, "messages": [] }, broadcast=True)
  


@views.route("/getMessages/<id>", methods=["GET"])
def get_messages(id):
    
    user_room = Rooms.query.filter_by(id = id).first()
    user_messages =  [*map(messages_serializer , user_room.messages)]
    return {"messages":user_messages}
    
 
@socketio.on("msgnotification")
def msg_notification(notify):
    
 
    
   
    emit("notification", {} ,broadcast=True)

  
    

    
@views.route('/clearnotification',methods=['POST'])
def clear_notification():
    request_data = json.loads(request.data)
    receiver_id = request_data["receiver_id"]
    room_id = request_data["room_id"]

    notification = MessageNotification.query.filter(MessageNotification.receiver_id.in_([receiver_id, room_id])).filter(MessageNotification.room_id.in_([receiver_id, room_id ])).all()
    print(notification, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")     
    for note in notification:

        db.session.delete(note)
        db.session.commit()
        print("deleted ------ bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    return("deleted ------ bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb ")