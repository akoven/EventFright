from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class TicketForm(FlaskForm):
    event_id = IntegerField("event_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    tickets_purchased = IntegerField("tickets_purchased", validators=[DataRequired()], max=10)
