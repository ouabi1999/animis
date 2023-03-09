from back_end.api import create_app
from back_end.api import socketio

from flask import send_from_directory
import os




app = create_app()

@app.route("/")

def serve():
    return send_from_directory(app.static_folder, "index.html")
    

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    
    socketio.run(app)

