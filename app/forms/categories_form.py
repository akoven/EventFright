from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import SelectField, IntegerField

class CategoryForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    type = SelectField("type", validators=[DataRequired()])
