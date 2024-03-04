from flask import Blueprint,request,session
from flask_login import login_required
from app.models import Task,Group
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
    # form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'POST':
        newTask = Task()
        if(len(form.data['deadline'])):
            form['deadline'].data = datetime.strptime(form.data['deadline'],'%Y-%m-%d')
        else:
            form['deadline'].data = None

        form['completed'].data = False

        form.populate_obj(newTask)

        newTask.user_id = userId
        db.session.add(newTask)
        db.session.commit()

        return newTask.to_dict()

# editting task
@task_routes.route('/<int:taskId>',methods=['PUT'])
@login_required
def updateTask(taskId):
    task = Task.query.get(taskId)



    if not task:
        return {'errors':'Task not found'},404

    if int(session['_user_id']) != task.user_id:
        return {'errors':"Forbidden"},401

    data = request.json


    if 'title' in data:
        task.title = data['title']
    if 'notes' in data:
        task.notes = data['notes']
    if 'links' in data:
        task.links = data['links']
    if data['deadline']:
        task.deadline = datetime.strptime(data['deadline'],'%Y-%m-%d')
    else:
        task.deadline = None
    if 'tag' in data:
        task.tag = data['tag']
    if 'difficulty' in data:
        task.difficulty = data['difficulty']

    db.session.commit()

    return task.to_dict()

# deleting task
@task_routes.route('/<int:taskId>',methods=["DELETE"])
@login_required
def deletedTask(taskId):
    task = Task.query.get(taskId)
    userId = session['_user_id']
    if not task:
        return {'errors':'Task not found'},404

    if task.user_id and userId != task.user_id:
        return {'errors':'Forbidden'},401


    if task.group_id:
        if task.group.organizer.id != int(userId):
            return {'errors':'Forbidden'},401

    db.session.delete(task)
    db.session.commit()

    return task.to_dict()
