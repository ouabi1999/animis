from email.policy import default
from . import db
from  datetime import datetime
from uuid import uuid4
from flask import json, jsonify, session


def get_uuid():
    return uuid4().hex


user_room = db.Table("user_room",
                       db.Column("room_id", db.String, db.ForeignKey("rooms.id"), primary_key = True),
                       db.Column("user_id", db.String, db.ForeignKey("users.id"), primary_key = True)
                    )

   

class Messages(db.Model):
    id = db.Column(db.String(100), primary_key = True, default = get_uuid)
    message = db.Column(db.PickleType(), nullable=False)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)
    is_Read = db.Column(db.Boolean , default = False)
    room_id = db.Column(db.String, db.ForeignKey('rooms.id'), nullable=False)
    sender = db.Column(db.String())
    receiver  =  db.Column(db.String())
   
    

    def __str__(self):      
        return f'{self.id} {self.message}{self.is_Read} {self.created_at} {self.sender} {self.room_id} {self.user_id}'

def messages_serializer(item):
    return{
         "id": item.id,
         "message" : item.message,
         "is_Read" : item.is_Read,
         "room_id"   : item.room_id,
         "sender" : item.sender,
         "receiver": item.receiver,
         "created_at" :json.dumps(item.created_at),

        }    
    
class Rooms(db.Model):
    id = db.Column(db.String(100), primary_key=True, unique=True, default = get_uuid)
    sender = db.Column(db.String,  db.ForeignKey('users.id'))
    receiver =  db.Column(db.String,  db.ForeignKey('users.id'))
    messages = db.relationship("Messages", backref="rooms", cascade='all, delete', order_by="Messages.created_at" , lazy = True)
    
    

    def __str__(self):      
        return f'{self.id} {self.receiver} {self.sender}'


def room_serializer(room):
   
    messages =  [*map(messages_serializer , room.messages)]
    return{
        "id" : room.id,
        "receiver" :room.receiver,
        "sender" : room.sender,
        "messages" : messages
    }



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
    reset_token = db.Column(db.String(36), nullable=True)
    token_expiration = db.Column(db.DateTime, nullable=True)
    userOrders = db.relationship('Orders', cascade='all, delete',  backref='user', lazy=True) 
    user_room = db.relationship('Rooms', secondary = "user_room",  lazy = 'dynamic', cascade='all, delete', backref = db.backref('user', lazy='dynamic')) 

                                               
    def __str__(self):
        return f"{self.id} {self.gender} {self.reset_token} {self.token_expiration} {self.admin} {self.countryCode} {self.country} {self.lastName} {self.firstName} {self.birthDate} {self.email} {self.password} {self.userAvatar}"

def user_serializer(user):
  
    rooms = Users.query.join(user_room).join(Rooms).filter((user_room.c.user_id == user.id) & (user_room.c.room_id == Rooms.id)).all()  
    user_rooms =  [*map(room_serializer, user.user_room)]
   
    
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
        #"messages" : messages,
        "rooms" : user_rooms,
      

        
    }

class Ratings(db.Model):
    id = db.Column(db.String(), primary_key=True, unique=True, default=get_uuid)
    stars = db.Column(db.Integer(), nullable = False)
    comment = db.Column(db.PickleType())
    product_id = db.Column(db.String(), db.ForeignKey('products.id'), nullable = False)
    userName  =  db.Column(db.String())
    userCountry = db.Column(db.String())
    userCountryCode = db.Column(db.String())
    rateDate = db.Column(db.DateTime(), default = datetime.utcnow)
    def __str__(self):
        return f"{self.id} {self.userCountry} {self.userCountryCode} {self.stars} {self.userName} {self.rateDate} {self.product_id}  {self.comment}"

def ratings_serializer(rate):
    return {
        "id" : rate.id,
        "stars" : rate.stars,
        "comment" : rate.comment,
        "product_id" : rate.product_id,
        "userName" : rate.userName,
        "userCountry" : rate.userCountry,
        "userCountryCode" :rate.userCountryCode,
        "rateDate" : rate.rateDate
        
    }


    
class Products(db.Model):
    id = db.Column(db.String(40), primary_key=True, unique=True, default=get_uuid)
    title = db.Column(db.String(), nullable = False)
    colors = db.Column(db.PickleType(), nullable = False)
    sizes = db.Column(db.PickleType())
    tags = db.Column(db.PickleType())
    price =  db.Column(db.Float(), nullable = False)
    discount = db.Column(db.Float(), nullable = False)
    quantity = db.Column(db.Integer(), nullable = False)
    description =  db.Column(db.PickleType(), nullable = False)
    reviews =  db.Column(db.PickleType())
    availability = db.Column(db.PickleType())
    category =  db.Column(db.String())
    product_type =  db.Column(db.String())
    pics_info = db.Column(db.PickleType())
    shipping_Method = db.Column(db.PickleType())
    seo = db.Column(db.PickleType())
    coupon = db.Column(db.String())
    series =  db.Column(db.Text())
    ratings = db.relationship('Ratings', backref='products', lazy = True, cascade="all, delete-orphan")
    globalCoupon = db.relationship("GlobalCoupon", backref="products", lazy = True, cascade="all, delete-orphan" )
    

    def __str__(self):
        return f'{self.id} {self.seo} {self.series} {self.title} {self.globalCoupon}  {self.shipping_Method} {self.pics_info} {self.product_type} {self.ratings} {self.colors} {self.tags} {self.availability} {self.category} {self.discount} {self.price} {self.sizes}{self.reviews}{self.quantity}{self.description}'
def productInfo_serializer(info):
    rats = [*map(ratings_serializer , (info.ratings))]
   
    coupon = [*map(globalCoupon_serializer, (GlobalCoupon.query.all()))]
    
    return{
        "id":info.id,
        "title":info.title,
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
        "series" : info.series,
        "ratings" : rats, #str([*map(ratings_serializer, rats)])}
        "coupon":info.coupon,
        "globalCoupon":info.globalCoupon
        
    }

class Orders(db.Model):
    id = db.Column(db.String(13), primary_key=True, unique=True, default=get_uuid)
    orderd_at = db.Column(db.DateTime(), nullable=False, default = datetime.utcnow)
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

class Display(db.Model):
    id = db.Column(db.String(80), primary_key=True, unique=True, default = get_uuid)
    logo = db.Column(db.Text())
    header = db.Column(db.PickleType())
    main_category = db.Column(db.PickleType())
    category = db.Column(db.PickleType())
    banners = db.Column(db.PickleType())
    slider = db.Column(db.PickleType())
    pop_up = db.Column(db.PickleType())
    count_Down = db.Column(db.Boolean) 
        
    def __str__(self):      
        return f'{self.id} {self.logo} {self.header} {self.main_category} {self.category} {self.banners} {self.slider} {self.pop_up} {self.count_Down}'
    
def display_serializer(item):
        return{
            "id": item.id,
            "logo" : item.logo,   
            "header" : item.header,
            "main_category" : item.main_category,
            "category" : item.category,
            "banners" : item.banners,
            "slider"  : item.slider,
            "pop_up" : item.pop_up,
            "count_Down" : item.count_Down
        }



class GlobalCoupon(db.Model):

    id = db.Column(db.String(35), primary_key = True, unique=True, default=get_uuid)
    globalCoupon = db.Column(db.String(30))
    product_id = db.Column(db.String(), db.ForeignKey('products.id'))

    def __str__(self):
        return f'{self.id} {self.globalCoupon}'

def globalCoupon_serializer(info):
    return{
        "id" :info.id,
        "globalCoupon": info.globalCoupon,
        
    }

