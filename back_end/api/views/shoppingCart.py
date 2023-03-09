from flask import Blueprint, jsonify, request, json


from ..models.models import  Products, productInfo_serializer


shopping_cart_route = Blueprint("shopping_cart_route", __name__ , url_prefix="/")

@shopping_cart_route.route('/api/get_shopping_cart_products', methods=["POST"])
def get_shopping_cart_products():
    shopping_cart = request.get_json()
    
    product_ids = [item['id'] for item in shopping_cart]
    products = Products.query.filter(Products.id.in_(product_ids)).all()
      
    return jsonify({'products': [*map(productInfo_serializer, products)],})

