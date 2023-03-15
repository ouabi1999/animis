from flask import Blueprint, jsonify, request, json


from ..models.models import  Products, productInfo_serializer, Orders, orders_serializer


getOrderdProducts_route = Blueprint("getOrderdProducts_route", __name__ , url_prefix="/")

@getOrderdProducts_route.route('/api/get_orderd_products', methods=["POST"])
def getOrderdProducts_products():
    orders = request.get_json()
    if orders is not None:

        ordered_products_ids = [product['id'] for order in orders for product in order['ordered_products']]

        products = Products.query.filter(Products.id.in_(ordered_products_ids)).all()
      
        return jsonify({'products': [*map(productInfo_serializer, products)]})
    else:
        
        return {'products': []}
  
@getOrderdProducts_route.route('/api/get_orders', methods=["GET"])
def getOrders():
   

    return jsonify({'orders': [*map(orders_serializer, Orders.query.all())]})
     

