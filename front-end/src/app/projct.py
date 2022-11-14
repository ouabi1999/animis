"""from itertools import product
from flask import Flask, request, session, json, jsonify, flash
from  datetime import datetime
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import DontWrapMixin
import os
from uuid import uuid4
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
from werkzeug.utils import secure_filename
from PIL import Image
import base64
import io
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
PRODUCTS_IMAGES = "./images/products_images"
app.config['PRODUCTS_IMAGES'] = PRODUCTS_IMAGES
ALLOWED_EXTENSIONS = set({ 'png', 'jpg', 'jpeg', 'gif'})
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['TEMPLATES_AUTO_RELOAD'] = True


CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.secret_key = os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
server_session = Session(app)

####/////////////////////
def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
def get_uuid():
    return uuid4().hex
class User(db.Model):
    id = db.Column(db.String(40), primary_key = True, unique=True, default=get_uuid)
    email = db.Column(db.String(200),  unique=True,  nullable = False)
    fullname = db.Column(db.String(30),  nullable = False)
    password = db.Column(db.String(200), nullable = False)
    birthday = db.Column(db.String(10),  nullable = False)
    def __str__(self):
        return f"{self.id} {self.fullname} {self.birthday} {self.email} {self.password}"
 
def user_serializer(user):
    return{
        "id":user.id,
        "email":user.email,
        "birthday":user.birthday,
        "fullname" : user.fullname,
        "password" : user.password
    }
    

@app.route("/api", methods=['GET'])
def home():
    return jsonify([*map(user_serializer, User.query.all())])

class ProductInfo(db.Model):
    id = db.Column(db.String(40), primary_key=True, unique=True, default=get_uuid)
    title = db.Column(db.String(), nullable = False)
    product_images = db.Column(db.PickleType(), nullable = False)
    sizes = db.Column(db.PickleType())
    colors = db.Column(db.PickleType())
    tags = db.Column(db.PickleType())
    price =  db.Column(db.Integer(), nullable = False)
    discount = db.Column(db.Integer(), nullable = False)
    quantity = db.Column(db.Integer(), nullable = False)
    description =  db.Column(db.Text(), nullable = False)
    reviews =  db.Column(db.Integer)
    availability = db.Column(db.String)
    category =  db.Column(db.String,)
    
    def __str__(self):
        return f'{self.id}{self.title} {self.colors} {self.tags} {self.availability} {self.category} {self.discount} {self.product_images} {self.price} {self.sizes}{self.reviews}{self.quantity}{self.description}'

def productInfo_serializer(info):
    return{
        "id":info.id,
        "title":info.title,
        "product_images": info.product_images,
        "sizes": info.sizes,
        "colors": info.colors,
        "price": info.price,
        "discount":info.discount,
        "quantity": info.quantity,
        "description": info.description,
        "reviews": info.reviews,
        "availability":info.availability,
        "category":info.category,
        "tags":info.tags

    }
@app.route("/products", methods=["POST"])
def products():

    #print(request.files.getlist("files"))
    files = request.files.getlist("files")
    images = []
    for file in files:
        if file and allowed_file(file.filename):
            #extension = file.filename.lower().split(".")[-1]
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['PRODUCTS_IMAGES'], filename))
            img = Image.open(app.config['PRODUCTS_IMAGES']+"/"+ filename)
            data = io.BytesIO()
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
                img.save(data,"JPEG")
            img.save(data,"JPEG")
            encode_img_data = base64.b64encode(data.getvalue())
            images.append(encode_img_data.decode("UTF-8"))
    

    newproducts = ProductInfo(
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
    #availability = request_data["availability"],
    category = request.form["category"],
    
) 
    db.session.add(newproducts)
    db.session.commit()
    return jsonify([*map(productInfo_serializer, ProductInfo.query.all())])

@app.route("/productsinfo", methods=['GET'])
def productsinfo():
    return jsonify([*map(productInfo_serializer, ProductInfo.query.all())])

class Orders(db.Model):
    id = db.Column(db.String(40), primary_key=True, default=get_uuid)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    fullname = db.Column(db.String, nullable=False)
    email = db.Column(db.String(30), unique=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    countery = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    products = db.Column(db.PickleType, nullable=False)

    def __str__(self):      
        return f'{self.id}{self.date} {self.fullname} {self.email} {self.address} {self.countery} {self.city} {self.state} {self.zipcode} {self.products}'

def orders_serializer(order):
    return{
        "id":order.id,
        "date":order.date,
        "fullname":order.fullname,
        "email":order.email,
        "address":order.address,
        "countery":order.countery,
        "city":order.city,
        "state":order.state,
        "zipcode":order.zipcode,
        "products":order.products,
    }


    ###//////////////////////////////////////////

@app.route("/orders",methods = ["POST"])
def orders():
    request_data = json.loads(request.data) #covert data to python dectionerie;
    userorder = Orders(
                    fullname = request_data["fullname"],
                    email = request_data["email"],
                    address = request_data["address"],
                    countery = request_data["countery"],
                    city = request_data["city"],
                    state = request_data["state"],
                    zipcode = request_data["zipcode"],
                    products= request_data["products"]   
                )
    db.session.add(userorder)
    db.session.commit()
    return {"201":"login succesfuly"}

@app.route("/info", methods=['GET'])
def info():
    return jsonify([*map(orders_serializer, Orders.query.all())])


@app.route("/register", methods=["POST"])
def register():
    request_data = json.loads(request.data)
    email = request_data["email"]
    password = request_data["password"]
    user_exist = User.query.filter_by(email = email).first()
    if user_exist is not None:
        return {"409":"the user already exist"}

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(
        fullname = request_data["fullname"],
        email = request_data["email"],
        password = hashed_password,
        birthday = request_data["birthday"]      
    )

    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    return {"201":"login succesfuly"}
    
@app.route("/login",methods=["POST"])
def login():
    request_data = json.loads(request.data) #covert data to python dectionerie
    email = request_data["email"]
    password = request_data["password"]
    user = User.query.filter_by(email = email).first()
    if user is None:
        return {"error":401},401
    if not bcrypt.check_password_hash(user.password, password):
        return {"error":401},401
    session["user_id"] = user.id
    return{
        "201":"logging succesful",
        "id": user.id,
        "email":user.email
        }
    
@app.route("/profile", methods=["GET"])
def profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error":"antorizedt"})
    user = User.query.filter_by(id = user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods =["GET"])
def logout_user():
    session.pop("user_id")

#get single products
@app.route("/product/<id>", methods=["GET"])
def get_product(id):
    product = ProductInfo.query.filter_by(id = id).first()
    return {productInfo_serializer, product }

#delete specific product
@app.route('/delete/<id>',methods=['DELETE'])
def delet_product(id):
    product = ProductInfo.query.filter_by(id = id).first()
    db.session.delete(product)
    db.session.commit()
    return ("Product deleted secssefully")
        
# edit a product
@app.route('/editproduct/<id>',methods=['PUT'])
def edit_product(id):
    product  = ProductInfo.query.filter_by(id = id)
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
        #availability = request_data["availability"],
        #category = request.form["category"],
        )
    )
    db.session.commit()
    return jsonify(*map(productInfo_serializer, product))

if __name__ =="__main__":
    app.run(debug=True)
"""