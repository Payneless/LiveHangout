from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Hangout, db, RSVP
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
	if hangout:
		return hangout.to_dict()
	else:
		return "Hangout not found", 404

@hangouts_routes.route("/new", methods=["POST"])
@login_required
def create_hangout():
	form = HangoutForm()
	form['csrf_token'].data = request.cookies['csrf_token']
	new_hangout = Hangout(
		host=form.data['host'],
		title=form.data['title'],
		link=form.data['link'],
		image=form.data['image'],
		open= form.data['open'],
		category= form.data['category'],
		startDate= form.data['startDate'],
		endDate= form.data['endDate'],
		startTime= form.data['startTime'],
		endTime= form.data['endTime'],
		description= form.data['description'],
	)
	db.session.add(new_hangout)
	db.session.commit()
	return new_hangout.to_dict()


@hangouts_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_hangout(id):
	hangout = Hangout.query.get(id)
	req = request.get_json()
	value = True if req['open'] == 'true' else False
	if hangout:
		hangout.title = req['title'] or hangout.title
		hangout.link = req['link'] or hangout.link
		hangout.image = req['image'] or hangout.image
		hangout.open = value or hangout.open
		hangout.category = req['category'] or hangout.category
		hangout.startDate = req['startDate'] or hangout.startDate
		hangout.endDate = req['endDate'] or hangout.endDate
		hangout.startTime = req['startTime'] or hangout.startTime
		hangout.endTime = req['endTime'] or hangout.endTime
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

@hangouts_routes.route("/<int:id>/rsvp", methods=["POST"])
@login_required
def add_rsvp(id):
	req = request.get_json()
	new_rsvp=RSVP(
		userId=req,
		hangoutId=id,
	)
	db.session.add(new_rsvp)
	db.session.commit()
	return new_rsvp.to_dict()

@hangouts_routes.route("/<int:hid>/rsvp/<int:uid>", methods=["DELETE"])
@login_required
def delete_rsvp(hid, uid):
	rsvp=RSVP.query.filter(RSVP.hangoutId == hid, RSVP.userId == uid).first()
	number = rsvp.id
	if rsvp:
		db.session.delete(rsvp)
		db.session.commit()
		return "RSVP deleted", 200
	else:
		return "RSVP not found", 404
