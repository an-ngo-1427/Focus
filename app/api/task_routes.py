from flask import Blueprint
from flask_login import login_required
from app.models import Task


task_routes = Blueprint('tasks',__name__)

# Getting all tasks
task_routes.route('/tasks')
@login_required
def getAllTasks():
    tasks = Task.query.all()
    return {"Tasks":[task.to_dict() for task in tasks]}

# Getting all tasks by userId
task_routes.route('/tasks/user/<int:userId>')
@login_required
def getTasksByUserId(userId):
    tasks = Task.query.filter(Task.user_id == userId).all()
    if(not tasks):
        return {'message':'Tasks not found for user'}

    return {"Tasks":[task.to_dict() for task in tasks]}

# Getting tasks by userId completed
task_routes.route('/tasks/user/<int:userId/completed')
@login_required
def getTasksByUserCompleted(userId):
    tasks = Task.query.filter_by(Task.user_id == userId,Task.completed is True).all()
    if(not tasks):
        return {'message':'Tasks not found for user'}
    return {"Tasks":[task.to_dict() for task in tasks]}


# Getting all tasks by groupId
task_routes.route('/tasks/group/<int:groupId')
@login_required
def getTasksByGroupId(groupId):
    tasks = Task.query.filter(Task.group_id == groupId).all()

    if(not tasks):
        return {'message':"Tasks not found for group"}

    return {"Tasks":[task.to_dict() for task in tasks]}

task_routes.route('/tasks/group/<int:groupId>/completed')
@login_required
def getTasksByGroupCompleted(groupId):
    tasks = Task.query.filter_by(Task.group_id == groupId, Task.completed is True).all()
    if(not tasks):
        return {'message':"Tasks not found for group"}
    return {"Tasks":[task.to_dict() for task in tasks]}

# Geting all tasks
