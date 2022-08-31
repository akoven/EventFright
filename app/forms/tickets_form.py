from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class TicketForm(FlaskForm):
    eventId = IntegerField("event_id", validators=[DataRequired()])
    userId = IntegerField("user_id", validators=[DataRequired()])
