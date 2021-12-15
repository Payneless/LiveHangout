from app.models import db, RSVP
from datetime import datetime

def seed_RSVPs():
	AOne = RSVP(
		userId=1, hangoutId=3
	)
	ATwo=RSVP(
		userId=1, hangoutId=4
	)
	BOne=RSVP(
		userId=2, hangoutId=1
	)
	COne=RSVP(
		userId=3, hangoutId=4
	)


	db.session.add(AOne)
	db.session.add(ATwo)
	db.session.add(BOne)
	db.session.add(COne)

	db.session.commit()

def undo_RSVPs():
		db.session.execute('TRUNCATE rsvps RESTART IDENTITY CASCADE;')
		db.session.commit()
