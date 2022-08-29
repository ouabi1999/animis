from email.policy import default
from . import db
from  datetime import datetime
from uuid import uuid4
from flask import json, jsonify


def get_uuid():
    return uuid4().hex
    
class Users(db.Model):
    id = db.Column(db.String(100), primary_key = True, unique=True, default=get_uuid)
    email = db.Column(db.String(200),  unique=True,  nullable = False)
    firstName = db.Column(db.String(30),  nullable = False)
    lastName  = db.Column(db.String(30),  nullable = False)
    gender = db.Column(db.String(30),  nullable = False)
    country =  db.Column(db.String(30),  nullable = False)
    countryCode = db.Column(db.String(30))
    password  = db.Column(db.String(200), nullable = False)
    birthDate  = db.Column(db.String(30),  nullable = False)
    userAvatar = db.Column(db.String(50), default= "boy.jpg")
    joined_at = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    admin = db.Column(db.Boolean, nullable = False, default = False)
    #rating_id = db.Column(db.String(), db.ForeignKey("users.id") ,nullable = False) 
    userOrders = db.relationship('Orders', cascade='all, delete', backref='user', lazy=True)
    ratings = db.relationship('Ratings', backref='user', lazy=True)


    def __str__(self):
        return f"{self.id} {self.gender} {self.admin}{self.countryCode} {self.country} {self.lastName} {self.firstName} {self.birthDate} {self.email} {self.password} {self.userAvatar}"
def user_serializer(user):

   
    return{
        "id":user.id,
        "email":user.email,
        "birthDate":user.birthDate,
        "firstName" : user.firstName,
        "lastName" : user.lastName,
        "gender" : user.gender,
        "country" : user.country,
        "countryCode" : user.countryCode,
        "userAvatar" : user.userAvatar,
        "admin" : user.admin,
        "joined_at" : user.joined_at,
        
    }

class Ratings(db.Model):
    id = db.Column(db.String(), primary_key=True, unique=True, default=get_uuid)
    stars = db.Column(db.Integer(), nullable = False)
    comment = db.Column(db.PickleType())
    product_id = db.Column(db.String(), db.ForeignKey('products.id'), nullable = False)
    user_id = db.Column(db.String(), db.ForeignKey('users.id'), nullable = False)

    def __str__(self):
        return f"{self.id} {self.stars}  {self.product_id}  {self.comment}"

def ratings_serializer(rate):
    return {
        "id" : rate.id,
        "stars" : rate.stars,
        "comment" : rate.comment,
        "product_id" : rate.product_id
    }


    
class Products(db.Model):
    id = db.Column(db.String(40), primary_key=True, unique=True, default=get_uuid)
    title = db.Column(db.String(), nullable = False)
    product_images = db.Column(db.PickleType(), nullable = False)
    sizes = db.Column(db.PickleType())
    colors = db.Column(db.PickleType())
    tags = db.Column(db.PickleType())
    price =  db.Column(db.Integer(), nullable = False)
    discount = db.Column(db.Integer(), nullable = False)
    quantity = db.Column(db.Integer(), nullable = False)
    description =  db.Column(db.PickleType(), nullable = False)
    reviews =  db.Column(db.PickleType())
    availability = db.Column(db.PickleType())
    category =  db.Column(db.String())
    gender =  db.Column(db.String())
    product_type =  db.Column(db.String())
    pics_info = db.Column(db.PickleType())
    shipping_Method = db.Column(db.PickleType())
    seo = db.Column(db.PickleType())
    ratings = db.relationship('Ratings', backref='products', lazy = True, cascade="all, delete-orphan")


    def __str__(self):
        return f'{self.id} {self.seo} {self.title} {self.gender} {self.shipping_Method} {self.pics_info} {self.product_type} {self.ratings} {self.colors} {self.tags} {self.availability} {self.category} {self.discount} {self.product_images} {self.price} {self.sizes}{self.reviews}{self.quantity}{self.description}'
def productInfo_serializer(info):
    rats = [*map(ratings_serializer , (info.ratings))]
 
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
        "tags":info.tags,
        "product_type": info.product_type,
        "pics_info" : info.pics_info,
        "shippingInfo" : info.shipping_Method,
        "seo" : info.seo,
        "ratings" : rats #str([*map(ratings_serializer, rats)])}
        
    }

class Orders(db.Model):
    id = db.Column(db.String(40), primary_key=True, default=get_uuid)
    orderd_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)
    firstName = db.Column(db.String())
    lastName = db.Column(db.String())
    email = db.Column(db.String(30), unique = False)
    address1 = db.Column(db.String())
    address2 = db.Column(db.String())
    city = db.Column(db.String())
    country = db.Column(db.String())
    state = db.Column(db.String())
    zipcode = db.Column(db.String())
    products = db.Column(db.PickleType())
    shippingMethod = db.Column(db.String())
    shippingPrice = db.Column(db.String())
    totalPrice = db.Column(db.Integer())
    paymentMethod = db.Column(db.PickleType())
    deliveryStatus = db.Column(db.String())
    trackingNumber = db.Column(db.String())
    user_id = db.Column(db.String(), db.ForeignKey("users.id"), nullable=False)


    def __str__(self):      
        return f'{self.id} {self.orderd_at} {self.paymentMethod}{self.trackingNumber} {self. deliveryStatu} {self.user_id} {self.firstName} {self.lastName} {self.shippingMethod} {self.shippingPrice} {self.totalPrice} {self.email} {self.address1}{self.address2} {self.country}{self.city} {self.state} {self.zipcode} {self.products}'

def orders_serializer(order):
    return{
        "shippingInfo":{
        "firstName" : order.firstName,
        "lastName" : order.lastName,
        "email" : order.email,
        "address1" : order.address1,
        "address2" : order.address2,
        "country":order.country,
        "city":order.city,
        "state":order.state,
        "zipcode":order.zipcode,
        },
        "id" : order.id,
        "date" : order.orderd_at,
        "products":order.products,
        "shippingMethod" : order.shippingMethod,
        "shippingPrice" : order.shippingPrice,
        "totalPrice" : order.totalPrice,
        "trackingNumber": order.trackingNumber,
        "deliveryStatus" : order.deliveryStatus,


        



    }   

