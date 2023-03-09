from api import  create_app, socketio
from flask import send_from_directory
import os
app = create_app()

@app.route("/")

def serve():
    #return send_from_directory(app.static_folder, "index.html")
    return {"error": "yes of course"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, debug=True, host='0.0.0.0', port=port)

