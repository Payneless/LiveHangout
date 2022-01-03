from .db import db
import datetime

class Hangout(db.Model):
	__tablename__= 'hangouts'

	id=db.Column(db.Integer, primary_key=True)
	host=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
	title=db.Column(db.String, nullable=False)
	link=db.Column(db.String, nullable=False)
	image=db.Column(db.String, nullable=False)
	description=db.Column(db.String, nullable=False)
	open=db.Column(db.Boolean, nullable=False)
	category=db.Column(db.String, nullable=False)
	startDate=db.Column(db.Date, nullable=False)
	endDate=db.Column(db.Date, nullable=False)
	startTime=db.Column(db.Time, nullable=False)
	endTime=db.Column(db.Time, nullable=False)
	createdAt=db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
	updatedAt=db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

	user = db.relationship('User', back_populates='hangouts')
	rsvps = db.relationship('RSVP', back_populates="hangout", cascade='all, delete')
	bookmarks = db.relationship('Bookmark', back_populates="hangout", cascade='all, delete')




	def to_dict(self):
		return {
			"id": self.id,
			"host": self.user.fName,
			"hostId": self.user.id,
			"title": self.title,
			"link": self.link,
			"image": self.image,
			"description": self.description,
			"open": self.open,
			"category": self.category,
			"startDate": self.startDate,
			"endDate": self.endDate,
			"startTime": str(self.startTime),
			"endTime": str(self.endTime),
			"rsvps": [rsvp.to_dict() for rsvp in self.rsvps],
			"bookmarks": [bookmark.to_dict() for bookmark in self.bookmarks]
		}
