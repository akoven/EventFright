from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, DecimalField
from wtforms.validators import DataRequired

class EventForm(FlaskForm):
    host_id = IntegerField("Host_id", validators=[DataRequired()])
    venue_id = IntegerField("Venue_id", validators=[DataRequired()])
    category_id = IntegerField("Category_id", validators=[DataRequired()])
    event_name = StringField("Event_name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    event_image = StringField("Event_image", validators=[DataRequired()])
    date = StringField("Date_time")
    capacity = IntegerField("Capacity", validators=[DataRequired()])
    price_per_guest = DecimalField("Price_per_guest", places=2)
