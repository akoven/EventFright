from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, IntegerField

class CategoryForm(FlaskForm):
    user_id = IntegerField("user_id")
    type = StringField("type", validators=[DataRequired()])
