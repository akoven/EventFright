from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SelectField
from wtforms.validators import DataRequired

class EventForm(FlaskForm):
    hostId = IntegerField("host_id", validators=[DataRequired()])
    venueId = IntegerField("venue_id", validators=[DataRequired()])
    categoryId = IntegerField("category_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    event_image = StringField("image", validators=[DataRequired()])
    date = DateTimeField("date_time", validators=[DataRequired()])
    capacity = IntegerField("capacity", validators=[DataRequired()])
