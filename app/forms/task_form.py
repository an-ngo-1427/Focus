from flask_wtf import FlaskForm
from wtforms import StringField,DateField,IntegerField,BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from datetime import datetime
def validate_date(form,field):
    deadline = field.data

    if datetime.strptime(deadline,'%Y-%m-%d') - datetime.now() <= 0:
        raise ValidationError('deadline has to be in the future')

class TaskForm(FlaskForm):
    title = StringField('title',validators=[DataRequired()])
    notes = StringField('notes')
    links = StringField('links')
    deadline = StringField('deadline',validators=[validate_date])
    tag = StringField('tag')
    difficulty = IntegerField('difficulty')
    completed = BooleanField('completed')
