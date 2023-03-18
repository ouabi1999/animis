from flask  import Blueprint, jsonify, request, redirect, json, session
from ...api import db
from ..models.models import  Orders, orders_serializer, product_orders
import stripe
import os

payment_route = Blueprint("payment_route", __name__)

endpoint_secret = os.environ.get('END_POINT_SECRET')

stripe.api_key = "sk_test_51MmjNCDJSVePKF96909V3aTkOUhFw6tS25zZq9jiujq7Ms49SmKk8KWJ4rQfKuaF4wLnP0dF8FKXLtztbeCECiFa00IBeFaqJE"

def calculate_order_amount(price):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return price


@payment_route.route('/create-payment', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
           
            amount = calculate_order_amount(data['totalPrice']),
            
            metadata = data,
            receipt_email =  data["email"],
            currency = "usd",
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403







@payment_route.route('/webhook', methods=['POST'])
def webhook():
    event = None
    payload = request.data
    try:
        event = json.loads(payload)
    except:
        print('⚠️  Webhook error while parsing basic request.' + str(e))
        return jsonify(success=False)
    if endpoint_secret:
        # Only verify the event if there is an endpoint secret defined
        # Otherwise use the basic event deserialized with json
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            print('⚠️  Webhook signature verification failed.' + str(e))
            return jsonify(success=False)

    # Handle the event
    if event and event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        request_data = event['data']['object']["metadata"]
        paymentMethod = event['data']['object']["charges"]["data"][0]
        # contains a stripe.PaymentIntent
        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
        ordered_products =  json.loads(request_data["ordered_products"]) 
        user_order = Orders(
            firstName      = request_data["firstName"],
            lastName       = request_data["lastName"],
            email          = request_data["email"],
            address1       = request_data["address1"],
            address2       = request_data["address2"],
            country        = request_data["country"],
            city           = request_data["city"],
            state          = request_data["state"],
            zipcode        = request_data["zipCode"], 
            shippingMethod = request_data["shippingMethod"],
            shippingPrice  = request_data["shippingPrice"],
            deliveryTime   = request_data["deliveryTime"],
            totalPrice     = request_data["totalPrice"],
            user_id        = request_data["user_id"],
            paymentMethod  = paymentMethod["payment_method_details"],
            ordered_products = ordered_products
        )
       
        db.session.add(user_order)
        db.session.commit()
        for product in ordered_products:
            order = product_orders.insert().values(order_id = user_order.id, product_id = product["id"])
            db.session.execute(order)
        db.session.commit()

    elif event['type'] == 'payment_method.attached':
        payment_method = event['data']['object']  # contains a stripe.PaymentMethod
        # Then define and call a method to handle the successful attachment of a PaymentMethod.
        # handle_payment_method_attached(payment_method)
    else:
        # Unexpected event type
        print('Unhandled event type {}'.format(event['type']))
    return jsonify(success=True)



