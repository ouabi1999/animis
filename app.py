from gevent import monkey
monkey.patch_all()

from back_end.api import create_app
from back_end.api import socketio
from back_end.api import talisman

from flask import send_from_directory
import os
from flask_talisman import  ALLOW_FROM




app = create_app()

@app.route("/")
@talisman(frame_options=ALLOW_FROM, frame_options_allow_from='*')
def serve():
    return send_from_directory(app.static_folder, "index.html")
    

@app.errorhandler(404)
@talisman(frame_options=ALLOW_FROM, frame_options_allow_from='*')
def not_found(e):
    return app.send_static_file('index.html')





if __name__ == "__main__":
    
    socketio.run(app)

