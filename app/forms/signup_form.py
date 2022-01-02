from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def dHandle_exists(form, field):
    # Checking if username is already in use
    dHandle = field.data
    user = User.query.filter(User.discordHandle == dHandle).first()
    if user:
        raise ValidationError('Discord Handle is already in use.')


class SignUpForm(FlaskForm):
    discordHandle = StringField(
        'discordHandle', validators=[DataRequired(), dHandle_exists])
    fName= StringField("firstName", validators=[DataRequired()])
    profilePhoto = StringField("profilePhoto")
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
