from flask_wtf import FlaskForm
from flask_wtf.file import  FileField,FileAllowed
from wtforms import SubmitField,StringField
from wtforms.validators import DataRequired
from app.api.aws_help import ALLOWED_EXTENSIONS
class GroupForm(FlaskForm):
    name = StringField('name',validators=[DataRequired()])
    image = FileField('image',validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
