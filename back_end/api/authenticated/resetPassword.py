from flask import request, jsonify, Blueprint, session, url_for, render_template
from flask_mail import  Message

from ...api import db, mail, bcrypt, server_session
from ..models.models import Users, user_serializer
from uuid import uuid4
from  datetime import datetime, timedelta


def get_uuid():
    return uuid4().hex
     



resetPassword_route = Blueprint("resetPassword_route", __name__)

@resetPassword_route.route('/reset_password', methods=['POST'])
def reset_password():
    email = request.json.get('email')
    user = Users.query.filter_by(email=email).first()
    if user:
        token = get_uuid()
        user.reset_token = token
        user.token_expiration = datetime.utcnow() + timedelta(minutes = 6)
        db.session.commit()
        msg = Message('Password Reset Request',
                      sender='animis.contact@gmail.com', recipients=[user.email])
        msg.html = render_template(
             "./password_reset_email.html",
            name=user.firstName, url="https://www.animis.shop/reset_password-token/{token}",
        )
       
        mail.send(msg)
        return jsonify({'message': "Password reset email sent , Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."}), 200
    else:
        return jsonify({'error': 'Email not found'}), 401



@resetPassword_route.route('/reset_password/<token>', methods=['POST'])
def confirm_reset_password(token):
    user = Users.query.filter_by(reset_token = token).first()
    password = request.json.get('password')
    if user:
        if user.token_expiration > datetime.utcnow():
            password = bcrypt.generate_password_hash(password).decode('utf-8')
            user.password = password
            user.reset_token = None
            user.token_expiration = None
            db.session.commit()
            session["user_id"] = user.id
            return jsonify({'message': 'Password reset successful'}), 200
        else:
            return jsonify({'message': 'Your reset password token is expired  '}), 401
    else:
        return jsonify({'message': 'Invalid token!'}), 402
 