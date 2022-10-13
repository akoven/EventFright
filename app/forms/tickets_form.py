from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length

class TicketForm(FlaskForm):
    event_id = IntegerField("event_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    tickets_sold = IntegerField("tickets_purchased", validators=[DataRequired()], max=10)
    tickets_available = IntegerField("tickets_available", validators=[DataRequired()])
    first_name = StringField("first_name", validators=[DataRequired()])
    last_name = StringField("last_name", validators=[DataRequired()])
    card_number = StringField("card_number", validators=[DataRequired(), Length(max=16)])
    csv = StringField("csv", validators=[DataRequired(), Length(max=3)])
    zip_code = StringField("zip_code", validators=[DataRequired(), Length(max=5)])
