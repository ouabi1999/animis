from flask import  Flask, Blueprint, jsonify, request, json, current_app
import os 
from PIL import Image
import base64
import io
from api import db, socketio, mail
from werkzeug.utils import secure_filename
from ..models.models import Users, Rooms, user_room, Messages, messages_serializer
   
    
from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room


get_messages_route = Blueprint("get_messages_route", __name__ , url_prefix="/")



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
   
    




@get_messages_route.route("/getMessages/<id>", methods=["GET"])
def get_messages(id):
    room = Rooms.query.filter_by(id = id).first()
    if room is None:

        return {"messages":[]}
   
    user_messages =  [*map(messages_serializer , room.messages)]
    return {"messages":user_messages}


@get_messages_route.route("/getMessages", methods=["GET"])
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

