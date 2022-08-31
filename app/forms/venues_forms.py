from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField
from wtforms.validators import DataRequired, Length

class VenueForm(FlaskForm):
   name = StringField("name", validators=[DataRequired()])
   address = StringField("address", validators=[DataRequired()])
   city = StringField("city", validators=[DataRequired()])
   state = SelectField("state", validators=[DataRequired()])
   zip_code = IntegerField("zip", validators=[DataRequired(), Length(max=5)])
   latitude = DecimalField("lat")
   longitude = DecimalField("long")

   def to_dict(self):
      return{
         'name':self.name,
         'address':self.address,
         'city':self.city,
         'state':self.state,
         'zip_code':self.zip_code,
         'latitude':self.latitude,
         'longitude':self.longitude
      }
