from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField
from wtforms.validators import DataRequired, Length

class VenueForm(FlaskForm):
   name = StringField("name", validators=[DataRequired()])
   address = StringField("address", validators=[DataRequired()])
   city = StringField("city", validators=[DataRequired()])
   state = SelectField("state", validators=[DataRequired()])
   zipCode = IntegerField("zip", validators=[DataRequired(), Length(max=5)])
   latitude = DecimalField("lat")
   longitude = DecimalField("long")
