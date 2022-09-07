from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import SelectField, IntegerField

class CategoryForm(FlaskForm):
    user_id = IntegerField("user_id")
    type = SelectField("type", validators=[DataRequired()])
