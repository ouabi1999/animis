from flask import  Flask, Blueprint, jsonify, request, json
import math
from ...api import db
from sqlalchemy import or_ , desc
from sqlalchemy import text
from sqlalchemy.sql import func
from werkzeug.utils import secure_filename
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

product_filters_route = Blueprint("product_filters_route ", __name__ , url_prefix="/")




@product_filters_route.route('/api/get_filtred_products')
def get_products():
    category = request.args.get('category')
    product_type = request.args.get('product_type')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    search = request.args.get('search')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)
    
    
      # Build the filter conditions
    filter_conditions = []
    
    if category:
        filter_conditions.append(Products.category == category)
    if product_type:
        filter_conditions.append(Products.product_type == product_type)
    if min_price:
        filter_conditions.append(Products.price >= float(min_price))
    if max_price:
        filter_conditions.append(Products.price <= float(max_price))
    if search:
       
        # Use PostgreSQL's full-text search features to match products based on their title
         # Search in the product name and description using MATCH operator
        search_terms = search.split()
        search_filters = []
        for term in search_terms:
            search_filters.append(Products.title.match(term))
            # search_filters.append(Products.description.match(term))
        filter_conditions.append(or_(*search_filters))
        
        
  

    # Query the database with the filter conditions and pagination parameters
    products_query = Products.query.filter(*filter_conditions)
    total_products = products_query.count()
    products = products_query.limit(per_page).offset((page - 1) * per_page).all()
    

   
    
    return jsonify({
        "products" :[*map(productInfo_serializer, products)],
        'total_pages':  math.ceil(total_products / per_page ) or 1,
        'total_products': total_products 
        
        })
    


@product_filters_route.route('/api/get_filtred_by_category')
def get_products_by_category():
    category = request.args.get('category')
    
    # Build the filter conditions
    if category:
        products = Products.query.filter_by(category = category).limit(3)
        return jsonify({"products" :[*map(productInfo_serializer, products)]})
    
    return jsonify({"products" :[]})

@product_filters_route.route('/api/get_filtred_by_most-selling')
def get_most_Selling_products():
   
   
    products = Products.query.order_by(desc(Products.orders.any())).limit(4).all()
    
   
    
    return jsonify({"products" :[*map(productInfo_serializer, products)]})