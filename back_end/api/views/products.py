from flask import  Flask, Blueprint, jsonify, request, json
from  datetime import datetime, timedelta
from ...api import db
from werkzeug.utils import secure_filename
import cloudinary.uploader
from sqlalchemy import desc
from ..models.models import (
   
    Products, 
    GlobalCoupon,
    productInfo_serializer,
    globalCoupon_serializer,
    orders_serializer,
    ratings_serializer,
    
)

from flask_cors import cross_origin, CORS
from flask_socketio import send, emit,  SocketIO, join_room

products_route = Blueprint("products_route", __name__ , url_prefix="/")

ALLOWED_EXTENSIONS = set({ 'png', 'jpg', 'jpeg', 'gif'})
def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS








@products_route.route("/api/get_dashboard_products", methods=['GET'])

def dashboard_products():
    currentPage = request.args.get('currentPage', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    products = Products.query.paginate(page=currentPage, per_page=per_page)
    return jsonify({
        'products': [*map(productInfo_serializer, products.items)],
        'currentPage': currentPage,
        'per_page': per_page,
        'total_pages': products.pages,
        'total_products': products.total,
    })
    

@products_route.route("/api/get_home_products", methods=['GET'])
def get_home_products():
    start = request.args.get('start', 0, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    products = Products.query.offset(start).limit(per_page).all()
    total_products = Products.query.count()
    return jsonify({
        'products': [*map(productInfo_serializer, products)],
        'total_products': total_products #start + per_page if len(products) == per_page else None,
        })

@products_route.route('/api/products_get-off-discount', methods=["GET"])
def get_products_discount():
    currentPage = request.args.get('currentPage', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    products = Products.query.paginate(page=currentPage, per_page=per_page)
    return jsonify({
        'products': [*map(productInfo_serializer, products.items)],
        'currentPage': currentPage,
        'per_page': per_page,
        'total_pages': products.pages,
        'total_products': products.total,
    })

@products_route.route("/api/add_products", methods=["POST"])
def add_products():
    #print(request.files.getlist("files"))
    shipping_price = request.form.getlist("shipping_price")
    shipping_type = request.form.getlist("shipping_type")
    shipping_delivery = request.form.getlist("shipping_delivery")
    
    files = request.files.getlist('colors')
    pics_details_files = request.files.getlist("pics_info")
    color_images_urls = []
    pics_details_urls = []
    description_images_urls = []
    
    for file in files:
        upload_result = cloudinary.uploader.upload(file)
        color_images_urls.append(upload_result['secure_url'])
        
    for file in pics_details_files:
        upload_result = cloudinary.uploader.upload(file)
        pics_details_urls.append(upload_result['secure_url'])
   
    newproducts = Products(
    title = request.form["title"],
    series = request.form["series"],
    sizes = request.form.getlist("sizes"),
    colors =  color_images_urls,
    tags = request.form.getlist("tags"),
    price = request.form["price"],
    discount = request.form["discount"],
    quantity = request.form["quantity"],
    description = request.form["description"],
    availability = request.form["availability"],
    category = request.form["category"],
    product_type = request.form["product_type"],
    pics_info = pics_details_urls,
    shipping_Method = json.loads(request.form["shipping_Method"]),
    seo =    request.form["seo"],
    coupon = request.form["coupon"],   
    
) 
    db.session.add(newproducts)
    db.session.commit()
    return jsonify([*map(productInfo_serializer, Products.query.all())])



#get specific product
@products_route.route("/product/<id>", methods=["GET"])
def get_product(id):
    product = Products.query.filter_by(id = id).first()
    rats = [*map(ratings_serializer , (product.ratings))]
    orders = [*map(orders_serializer , (product.orders))]
   
    globalCoupon = [*map(globalCoupon_serializer, (GlobalCoupon.query.all()))]
 
    return{
        "id":product.id,
        "title":product.title,
        "sizes": product.sizes,
        "colors": product.colors,
        "price": product.price,
        "discount":product.discount,
        "quantity": product.quantity,
        "description": product.description,
        "availability":product.availability,
        "category":product.category,
        "tags":product.tags,
        "product_type": product.product_type,
        "pics_info" : product.pics_info,
        "shippingInfo" : product.shipping_Method,
        "seo" : product.seo,
        "series":product.series,
        "ratings" : rats, #str([*map(ratings_serializer, rats)])}  ,
        "orders" : len(orders),
        "coupon":product.coupon,
        "globalCoupon":globalCoupon,
    }


#delete specific product
@products_route.route('/delete/<id>',methods=['DELETE'])
def delete_product(id):
    product = Products.query.filter_by(id = id).first()
    db.session.delete(product)
    db.session.commit()
    return ("Product deleted secssefully")
        
# edit a product
@products_route.route('/editproduct/<id>',methods=['PUT'])
def edit_product(id):
    product  = Products.query.filter_by(id = id)
    
        
    if product is not None:
        color_files = request.form.getlist('colors')
        pics_details_files = request.form.getlist("pics_info")
        color_images_urls = []
        pics_details_urls = []
        description_images_urls = []
        
        if color_files:
            
            for file in color_files:
                if isinstance(file, str) and (file.startswith("http://") or file.startswith("https://")):
                    color_images_urls.append(file)
                  
                else:
                    
                    upload_result = cloudinary.uploader.upload(file)
                    color_images_urls.append(upload_result['secure_url'])
                    
                    
        if  pics_details_files:
            for file in pics_details_files:
                if isinstance(file, str) and (file.startswith("http://") or file.startswith("https://")):
                    pics_details_urls.append(file)
                else:
                    upload_result = cloudinary.uploader.upload(file)
                    pics_details_urls.append(upload_result['secure_url'])
            
        #set product into database
        product.update(dict(
            title = request.form["title"],
            product_type = request.form["product_type"],
            colors = color_images_urls,
            sizes = request.form.getlist("sizes"),
            tags = request.form.getlist("tags"),
            price = request.form["price"],
            discount = request.form["discount"],
            quantity = request.form["quantity"],
            description = request.form["description"],
            availability = request.form["availability"],
            category = request.form["category"],
            pics_info = pics_details_urls,
            shipping_Method = json.loads(request.form["shipping_Method" ]), 
            coupon = request.form["coupon"],
            series = request.form["series"]

   
           )
            )
        db.session.commit()
        return jsonify(*map(productInfo_serializer, product))
    else:
        return {"error" : "the product isn't exist any more ..."} ,401 
    
@products_route.route('/api/get_recent_products',methods=['GET'])   
def get_newLsitedProducts():
    recent_products = Products.query.filter(Products.created_at >= datetime.utcnow() - timedelta(days=15)).limit(12).all()
    if recent_products is None :
        recent_products = Products.query.order_by(desc(Products.id)).limit(10).all()
    return jsonify([*map(productInfo_serializer, recent_products)])