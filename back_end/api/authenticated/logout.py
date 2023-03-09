from flask  import Blueprint, session

logout_route = Blueprint("logout_route", __name__)
@logout_route.route("/logout", methods = ["POST"])
def logout_user():
    session.clear()
    return "200"