from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    discordHandle = db.Column(db.String, nullable=False, unique=True)
    fName = db.Column(db.String, nullable=False, unique=True)
    profilePhoto = db.Column(db.String)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)

    hangouts = db.relationship("Hangout", back_populates='user', cascade='all, delete')
    rsvps = db.relationship("RSVP", back_populates='user', cascade='all, delete')
    bookmarks = db.relationship("Bookmark", back_populates='user', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'fName': self.fName,
            'discordHandle': self.discordHandle,
            'profilePhoto': self.profilePhoto,
            'hangouts':  [hangout.to_dict() for hangout in self.hangouts],
            'RSVPs': [rsvp.to_dict() for rsvp in self.rsvps],
            'Bookmarks': [bookmark.to_dict() for bookmark in self.bookmarks],
            'email': self.email
        }
