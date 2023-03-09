from flask import  Flask, Blueprint, jsonify, request, json, current_app
import os 
from PIL import Image
import base64
import io
from ...api import db, socketio, mail
from werkzeug.utils import secure_filename
from ..models.models import Users, Rooms, user_room
   
        

from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room


get_room_route = Blueprint("get_room_route", __name__ , url_prefix="/")

@socketio.on('join_room')
def on_join(data):
    sender = data["owner_id"]
    receiver = data["receiver_id"]
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
  

@get_room_route.route("/getRoom", methods=["POST"])
def joingUserRoom():
    data = json.loads(request.data)
    sender = data["owner_id"]
    receiver = data["receiver_id"]
    room = Rooms.query.filter(Rooms.sender.in_([sender, receiver])).filter(Rooms.receiver.in_([sender, receiver ])).first()
    if room is not None:
        
        #send({"room_id" : room.id ,'owner_id': owner_id, "receiver_id": receiver_id}, to=room)
        return {"id" : room.id ,'sender': room.sender, "receiver": room.receiver}
                                                         

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
        return{"id" : new_room.id ,'sender': new_room.sender, "receiver": new_room.receiver, "messages": [] }