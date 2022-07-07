"""from flask import Flask , request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=True
db = SQLAlchemy(app)
ma = Marshmallow(app)
class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

class PersonSchema(ma.Schema):
    class Meta:
        fields = ('id','firstname','lastname','email','password')

person = PersonSchema()
persons = PersonSchema(many=True)



@app.route('/person', methods=["POST"])
def add_person():
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email = request.json['email']
    password = request.json['password']
    new_person = Person(firstname=firstname,lastname=lastname,email=email,password=password)
    db.session.add(new_person)
    db.session.commit()
    return jsonify(person.dump(new_person))

@app.route('/person', methods=["GET"])
def get_person():
    all_persons = Person.query.all()
    result = persons.dump(all_persons)
    return jsonify(result)

@app.route('/person/<int:id>',methods=["PUT"])
def get_peron(id):
    person_data = Person.query.get(id)
    person_data.firstname = request.json['firstname']
    person_data.lastname = request.json['lastname']
    person_data.email = request.json['email']
    person_data.password = request.json['password']
    db.session.commit()
    return jsonify(person.dump(person_data))

@app.route('/person/<int:id>',methods=["DELETE"])
def person_delete(id):
    person_data = Person.query.get(id)
    db.session.delete(person_data)
    db.session.commit()
    return jsonify(person.dump(person_data))


if __name__ == '__main__':
    app.run(debug=True)




from enum import unique
from bcrypt import hashpw
from flask import Flask, request, session, json, url_for, redirect, jsonify
from  datetime import datetime
from flask_cors import CORS, cross_origin
from sqlalchemy.exc import DontWrapMixin
import os
from uuid import uuid4
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_session import Session
import redis


app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.secret_key = os.urandom(24)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///userinfo.db"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
server_session = Session(app)

####/////////////////////
class User(db.Model):
    id = db.Column(db.String(40), primary_key = True, default=uuid4().hex)
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
    id = db.Column(db.String(40), primary_key=True, default=uuid4().hex)
    title = db.Column(db.String(), nullable = False)
    
    def __str__(self):
        return f'{self.id}{self.title}'
def productInfo_serializer(info):
    return{
        "id":info.id,
        "title":info.title,
    }
@app.route("/products", methods=["POST"])
def products():
    request_data = json.loads(request.data)
    newproducts = ProductInfo(
        title = request_data["title"]
    )
    db.session.add(newproducts)
    db.session.commit()
    return{"201":"login succsufl"}

@app.route("/productsinfo", methods=['GET'])
def productsinfo():
    return jsonify([*map(productInfo_serializer, ProductInfo.query.all())])

class Orders(db.Model):
    id = db.Column(db.String(40), primary_key=True, default=uuid4().hex)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    fullname = db.Column(db.String, nullable=False)
    email = db.Column(db.String(30), unique=True)
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
    
if __name__ =="__main__":
    app.run(debug=True)





    class ProductInfo(db.Model):
    id = db.Column(db.String(40), primary_key=True, unique=True, default=get_uuid)
    title = db.Column(db.String(), nullable = False)
    product_images = db.Column(db.PickleType(), nullable = False)
    sizes = db.Column(db.PickleType())
    colors = db.Column(db.PickleType())
    tags = db.Column(db.PickleType())
    price =  db.Column(db.String(), nullable = False)
    discount = db.Column(db.String(), nullable = False)
    quantity = db.Column(db.String(), nullable = False)
    description =  db.Column(db.Text(), nullable = False)
    reviews =  db.Column(db.String )
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
    images = request.files
    for item in images:        
        uploaded_file = images.get(item)

    request_data = json.loads(request.data)
    newproducts = ProductInfo(
    title = request_data["title"],
    product_images = uploaded_file,
    sizes = request_data["sizes"],
    colors = request_data["colors"],
    price = request_data["price"],
    discount = request_data["discount"],
    quantity = request_data["quantity"],
    description = request_data["description"],
    reviews = request_data["reviews"],
    availability = request_data["availability"],
    category = request_data["category"],
    tags = request_data["tags"]
)
    
    db.session.add(newproducts)
    db.session.commit()
    return{"201":"login succsufl"}

   
    """