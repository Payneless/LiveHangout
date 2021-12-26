from wtforms import StringField, IntegerField, SubmitField, BooleanField, DateField, TimeField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class HangoutForm(FlaskForm):

	host=IntegerField("host", validators=[DataRequired()])
	title=StringField("title", validators=[DataRequired()])
	link=StringField("link", validators=[DataRequired()])
	image=StringField("image")
	open=BooleanField("open", validators=[DataRequired()])
	category=StringField("category", validators=[DataRequired()])
	startDate=DateField("startDate", validators=[DataRequired()])
	endDate=DateField("endDate", validators=[DataRequired()])
	startTime=TimeField("startTime", validators=[DataRequired()])
	endTime=TimeField("endTime", validators=[DataRequired()])
