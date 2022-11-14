from flask  import Blueprint, jsonify, request, redirect, json, session
from api import db
from .models import  Orders, orders_serializer
import stripe
import os

payment = Blueprint("payment", __name__)

endpoint_secret = "whsec_xcu6H6cQpa4L8Z9bnnXFkBvasZSwfbzJ"

stripe.api_key = 'sk_test_51LH58oGw1CxnQh9eyl2XxZsoIRqZWWfGlpgHZoYk8o1YqEbeZnAF36bFJm8HKx43HxeZnMXCWaOpOJO4qUSkrvSj00zRVERDWj'

def calculate_order_amount(price):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return price


@payment.route('/create-payment', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
           
            amount = calculate_order_amount(data['totalPrice']),
            metadata = data,
            receipt_email =  data["email"],
            currency = 'eur',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403




@payment.route("/create-order", methods = ["POST"])
def createOrder():
    request_data = json.loads(request.data)
    userorder = Orders(
            firstName      = request_data["firstName"],
            lastName       = request_data["lastName"],
            email          = request_data["email"],
            address1       = request_data["address1"],
            address2       = request_data["address2"],
            country        = request_data["country"],
            city           = request_data["city"],
            state          = request_data["state"],
            zipcode        = request_data["zip"],
            products       = request_data["orderInfo"] , 
            shippingMethod = request_data["shippingMethod"],
            shippingPrice  = request_data["shippingPrice"],
            totalPrice     = request_data["totalPrice"],
            user_id        = request_data["userId"],
            
        )
    db.session.add(userorder)
    db.session.commit()
    return jsonify([*map(orders_serializer, Orders.query.all())])


@payment.route('/webhook', methods=['POST'])
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
        print('Payment for {} succeeded'.format(payment_intent['amount']))
        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
        userorder = Orders(
            firstName      = request_data["firstName"],
            lastName       = request_data["lastName"],
            email          = request_data["email"],
            address1       = request_data["address1"],
            address2       = request_data["address2"],
            country        = request_data["country"],
            city           = request_data["city"],
            state          = request_data["state"],
            zipcode        = request_data["zip"], 
            shippingMethod = request_data["shippingMethod"],
            shippingPrice  = request_data["shippingPrice"],
            totalPrice     = request_data["totalPrice"],
            user_id        = request_data["userId"],
            products       = request_data["orderInfo"],
            paymentMethod  = paymentMethod ["payment_method_details"],
            deliveryStatus = request_data["orderInfo"],
            trackingNumber = request_data["orderInfo"],
           
        )
        db.session.add(userorder)
        db.session.commit()

    elif event['type'] == 'payment_method.attached':
        payment_method = event['data']['object']  # contains a stripe.PaymentMethod
        # Then define and call a method to handle the successful attachment of a PaymentMethod.
        # handle_payment_method_attached(payment_method)
    else:
        # Unexpected event type
        print('Unhandled event type {}'.format(event['type']))
    return jsonify(success=True)






    
   