from .db import db
import datetime

class Bookmark(db.Model):
	__tablename__="bookmarks"

	id=db.Column(db.Integer, primary_key=True)
	userId=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
	hangoutId=db.Column(db.Integer, db.ForeignKey('hangouts.id'), nullable=False)
	createdAt = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
	updatedAt = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

	def to_dict(self):
		return{
			"id": self.id,
			"userId": self.userId,
			"hangoutId": self.hangoutId
		}
