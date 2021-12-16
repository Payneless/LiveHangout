from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Hangout

hangouts_routes = Blueprint('hangouts', __name__)


@hangouts_routes.route('/')
# @login_required
def hangouts():
	hangouts = Hangout.query.order_by(Hangout.createdAt.desc()).all()

	return {'hangouts': [hangout.to_dict() for hangout in hangouts]}
