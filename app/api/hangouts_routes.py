from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Hangout, db, RSVP, Bookmark
from app.forms.hangout_form import HangoutForm
from datetime import datetime

hangouts_routes = Blueprint('hangouts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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
	if form.validate_on_submit():
		new_hangout = Hangout(
			host=form.data['host'],
			title=form.data['title'],
			link=form.data['link'],
			image=form.data['image'] if len(form.data['image']) is not 0 else "https://cdn.discordapp.com/attachments/897232495580414045/927094319511400498/placeholder.png",
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
	return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@hangouts_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_hangout(id):
	hangout = Hangout.query.get(id)
	req = request.get_json()
	value = True if req['open'] == 'true' else False
	if hangout:
		hangout.title = req['title'] if req['title'] else hangout.title
		hangout.link = req['link'] if req['link'] else hangout.link
		hangout.image = req['image'] if req['image'] else hangout.image
		hangout.open = value if value else hangout.open
		hangout.category = req['category'] if req['category'] else hangout.category
		hangout.startDate = req['startDate'] if req['startDate'] else hangout.startDate
		hangout.endDate = req['endDate'] if req['endDate'] else hangout.endDate
		hangout.startTime = req['startTime'] if req['startTime'] else hangout.startTime
		hangout.endTime = req['endTime'] if req['endTime'] else hangout.endTime
		hangout.description = req['description'] if req['description'] else hangout.description
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

@hangouts_routes.route("/<int:hid>/bookmarks", methods=["POST"])
@login_required
def add_bookmark(hid):
	req = request.get_json()
	new_bookmark = Bookmark(
		userId=req,
		hangoutId=hid,
	)
	db.session.add(new_bookmark)
	db.session.commit()
	return new_bookmark.to_dict()

@hangouts_routes.route("/<int:hid>/bookmarks/<int:uid>", methods=["DELETE"])
@login_required
def delete_bookmark(hid, uid):
	bookmark=Bookmark.query.filter(Bookmark.hangoutId == hid, Bookmark.userId == uid).first()
	if bookmark:
		db.session.delete(bookmark)
		db.session.commit()
		return "RSVP deleted", 200
	else:
		return "RSVP not found", 404
