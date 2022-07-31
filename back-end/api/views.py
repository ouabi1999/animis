from flask import  Flask, Blueprint, jsonify, request, json, current_app
import os 
from PIL import Image
import base64
import io
from api import db
from werkzeug.utils import secure_filename
from .models import Users, Products, user_serializer, productInfo_serializer, orders_serializer, ratings_serializer, Orders, Ratings
from flask_cors import cross_origin, CORS

views = Blueprint("views", __name__)
ALLOWED_EXTENSIONS = set({ 'png', 'jpg', 'jpeg', 'gif'})
def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@views.route("/api", methods=['GET'])
def Home():
    return jsonify([*map(user_serializer, Users.query.all())])

@views.route("/productsinfo", methods=['GET'])
def productsinfo():
    return jsonify([*map(productInfo_serializer, Products.query.all())])

@views.route("/products", methods=["POST"])
def products():
    #print(request.files.getlist("files"))
    """files = request.files.getlist("files")
    images = []
    for file in files:
        if file and allowed_file(file.filename):
            #extension = file.filename.lower().split(".")[-1]
            filename = secure_filename(file.filename)
            file.save(os.path.join(current_app.config["PRODUCTS_IMAGES"], filename))
            img = Image.open(current_app.config["PRODUCTS_IMAGES"] +"/"+ filename)
            data = io.BytesIO()
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
                img.save(data,"JPEG")
            img.save(data,"JPEG")
            encode_img_data = base64.b64encode(data.getvalue())
            images.append(encode_img_data.decode("UTF-8"))
    
"""
    newproducts = Products(
    title = request.form["title"],
    product_images = request.form.getlist("images"),
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
    product_type = request.form["product_type"],
    pics_info =  request.form["pics_info"],
    shipping_Method = request.form["shipping_Method"],
    seo =    request.form["seo"],
    
) 
    db.session.add(newproducts)
    db.session.commit()
    return jsonify([*map(productInfo_serializer, Products.query.all())])




@views.route("/product/<id>", methods=["GET"])
def get_product(id):
    product = Products.query.filter_by(id = id).first()
    return {productInfo_serializer, product }

#delete specific product
@views.route('/delete/<id>',methods=['DELETE'])
def delet_product(id):
    product = Products.query.filter_by(id = id).first()
    db.session.delete(product)
    

    db.session.commit()
    return ("Product deleted secssefully")
        
# edit a product
@views.route('/editproduct/<id>',methods=['PUT'])
def edit_product(id):
    product  = Products.query.filter_by(id = id)
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
        availability = request.form["availability"],
        category = request.form["category"],
    )
    )
    db.session.commit()
    return jsonify(*map(productInfo_serializer, product))

@views.route("/ratings",methods = ["POST"])
def rating():
    request_data = json.loads(request.data) #covert data to python dectionerie;
    user_rating = Ratings(
                    product_id = request_data["product_id"],
                    user_id = request_data["user_id"],
                    stars = request_data["stars"],
                    comment = request_data["comment"]  
                )
    db.session.add(user_rating)
    db.session.commit()
    return jsonify([*map(ratings_serializer, Ratings.query.all())])
@views.route("/getratings",methods = ["GET"])
def getrating():
    return jsonify([*map(ratings_serializer, Ratings.query.all())])