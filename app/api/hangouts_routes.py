from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Hangout, db
from app.forms.hangout_form import HangoutForm
from datetime import datetime

hangouts_routes = Blueprint('hangouts', __name__)


@hangouts_routes.route('/')
# @login_required
def hangouts():
	hangouts = Hangout.query.order_by(Hangout.createdAt.desc()).all()

	return {'hangouts': [hangout.to_dict() for hangout in hangouts]}

@hangouts_routes.route('/<int:id>')
def one_hangout(id):
	hangout = Hangout.query.get(id)
	print("LOL", hangout)
	if hangout:
		return hangout.to_dict()
	else:
		return "Hangout not found", 404

@hangouts_routes.route("/new", methods=["POST"])
@login_required
def create_hangout():
	form = HangoutForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	hangout=Hangout(**request.json)
	db.session.add(hangout)
	db.session.commit()
	return hangout.to_dict()


@hangouts_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_hangout(id):
	hangout = Hangout.query.get(id)
	req = request.get_json()
	if hangout:
		hangout.title = req.title or hangout.title
		hangout.link = req.link or hangout.link
		hangout.image = req.image or hangout.image
		hangout.open = req.open or hangout.open
		hangout.category = req.category or hangout.category
		hangout.startDate = req.startDate or hangout.startDate
		hangout.endDate = req.endDate or hangout.endDate
		hangout.startTime = req.startTime or hangout.startTime
		hangout.endTime = req.endTime or hangout.endTime
		hangout.updatedAt = datetime.now()
		db.session.commit()
		return hangout.to_dict()
	else:
		return "Hangout not found", 404

@hangouts_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_hangout(id):
	hangout=Hangout.query.get(id)
	if hangout:
		db.session.delete(hangout)
		db.session.commit()
		return "Hangout deleted", 200
	else:
		return "Hangout not found", 404
