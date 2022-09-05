from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SelectField, TextAreaField
from wtforms.validators import DataRequired

class EventForm(FlaskForm):
    host_id = IntegerField("Host_id", validators=[DataRequired()])
    venue = SelectField("Location", validators=[DataRequired()])
    category = SelectField("Category", validators=[DataRequired()])
    event_name = StringField("Event_name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    event_image = StringField("Event_image", validators=[DataRequired()])
    date = DateTimeField("Date_time", validators=[DataRequired()])
    capacity = IntegerField("Capacity", validators=[DataRequired()])
