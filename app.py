from api import create_app, socketio
from flask import  Flask, Blueprint, jsonify, request, json, send_from_directory
import os 
from PIL import Image
import base64
import io
from api import db, socketio, mail
from werkzeug.utils import secure_filename

main_route = Blueprint("main_route", __name__, url_prefix="/", static_folder="front-end/build", static_url_path="")

@main_route.route("/")
def serve():
    return send_from_directory(main_route.static_folder, "index.html")

app = create_app()

if __name__ == "__main__":
    socketio.run(app, debug=True)

