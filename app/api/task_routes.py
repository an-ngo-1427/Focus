from flask import Blueprint,request
from flask_login import login_required
from app.models import Task
from app.models.db import db
from sqlalchemy import and_
from app.forms.task_form import TaskForm
from datetime import datetime
task_routes = Blueprint('tasks',__name__)

# Getting all tasks
@task_routes.route('/')
@login_required
def getAllTasks():
    tasks = Task.query.all()
    return {"Tasks":[task.to_dict() for task in tasks]}

# Getting all tasks by userId
@task_routes.route('/user/<int:userId>')
@login_required
def getTasksByUserId(userId):
    tasks = Task.query.filter(Task.user_id == userId).all()
    if(not tasks):
        return {'message':'Tasks not found for user'},404

    return {"Tasks":[task.to_dict() for task in tasks]}

# Getting tasks by userId completed
@task_routes.route('/user/<int:userId>/completed')
@login_required
def getTasksByUserCompleted(userId):
    tasks = Task.query.filter(and_(Task.user_id == 1,Task.completed))
    if(not tasks):
        return {'message':'Tasks not found for user'},404
    return {"Tasks":[task.to_dict() for task in tasks]}


# Getting all tasks by groupId
@task_routes.route('/group/<int:groupId>')
@login_required
def getTasksByGroupId(groupId):
    tasks = Task.query.filter(Task.group_id == groupId).all()

    if(not tasks):
        return {'message':"Tasks not found for group"},404

    return {"Tasks":[task.to_dict() for task in tasks]}

@task_routes.route('/group/<int:groupId>/completed')
@login_required
def getTasksByGroupCompleted(groupId):
    tasks = Task.query.filter(and_(Task.group_id == groupId, Task.completed)).all()
    if(not tasks):
        return {'message':"Tasks not found for group"},404
    return {"Tasks":[task.to_dict() for task in tasks]}


# creating a task for a user
@task_routes.route('/user/<int:userId>/new',methods=['POST'])
@login_required
def createUserTask(userId):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit):
        newTask = Task()
        form['deadline'].data = datetime.strptime(form.data['deadline'],'%Y-%m-%d')


        form.populate_obj(newTask)

        db.session.add(newTask)
        db.session.commit()

        return newTask.to_dict()
