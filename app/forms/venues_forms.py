from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class VenueForm(FlaskForm):
   user_id = IntegerField("user_id")
   name = StringField("name", validators=[DataRequired()])
   address = StringField("address", validators=[DataRequired()])
   city = StringField("city", validators=[DataRequired()])
   state = StringField("state", validators=[DataRequired()])
   zip_code = StringField("zip", validators=[DataRequired(), Length(max=5)])
   latitude = IntegerField("lat")
   longitude = IntegerField("long")

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
