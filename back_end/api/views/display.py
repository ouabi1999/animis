from flask import  Flask, Blueprint, jsonify, request, json
import os 
from PIL import Image
import base64
import io
from ...api import db, socketio, mail
from werkzeug.utils import secure_filename
from ..models.models import  Display, display_serializer



display_route = Blueprint("display_route", __name__ , url_prefix="/")






@display_route.route("/displayInfo", methods=['GET'])
def displayInfo():
    return jsonify(*map(display_serializer, Display.query.all()))





@display_route.route("/display", methods=["POST"])
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
    return jsonify(*map(display_serializer, newDisplay.query.all()))

@display_route.route('/update-display-setting/<id>',methods=['PUT'])
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
            
        ) 
    ) 
    
            
        
        db.session.commit()
        return jsonify(*map(display_serializer, display))
    else:
        return {"error" : "the product isn't exist any more ..."} ,401 