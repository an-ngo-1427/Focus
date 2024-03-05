from app.models import Group,User,Task,db,user_groups
from flask import Blueprint,session,request
from flask_login import login_required
from datetime import datetime
from sqlalchemy import insert,delete,and_
group_routes = Blueprint('groups',__name__)

# getting all groups
@group_routes.route('/',methods=['GET'])
@login_required
def getGroups():
    groups = Group.query.all()
    return {"Groups":[group.to_dict() for group in groups]},200

# getting groups of current user
@group_routes.route('/user')
@login_required
def getUserGroups():
    user = User.query.get(session['_user_id'])
    groups = [group.to_dict() for group in user.groups]
    return {'Groups':groups},200


# getting groups organized by the user
@group_routes.route('/user/own')
def getUserOwnerGroup():
    user = User.query.get(session['_user_id'])
    groups = [group.to_dict() for group in user.owner_groups]
    return {'Groups':groups}

# getting group by id
@group_routes.route('/<int:groupId>')
@login_required
def getGroupDetails(groupId):
    group = Group.query.get(groupId)
    userId = session["_user_id"]
    if(not group):
        return {'message':'Group not found'}

    return group.to_dict(),200

# Creating a group
@group_routes.route('/new',methods=['POST'])
@login_required
def createGroup():
    group = Group()
    userId = session['_user_id']
    data = request.json
    group.name = data['name']
    group.organizer_id = userId
    group.image_url = data['image_url']

    db.session.add(group)
    db.session.commit()
    return group.to_dict(),201


# editting group
@group_routes.route('/<int:groupId>',methods = ['PUT'])
def editGroup(groupId):
    group = Group.query.get(groupId)
    userId = session['_user_id']
    if not group:
        return {'message':'group not found'},404

    if int(userId) != group.organizer.id:
        return {'message':'Forbidden'},401

    data = request.json

    group.name = data['name']
    group.image_url = data['image_url']

    db.session.commit()
    return group.to_dict(),200

# Adding tasks to group
@group_routes.route('/<int:groupId>/tasks',methods=['POST'])
@login_required
def addGroupTask(groupId):
    group = Group.query.get(groupId)
    userId = session['_user_id']
    if not group:
        return {'message':'group not found'},404

    if int(userId) != group.organizer.id:
        return {'message':'Forbidden'},401

    newTask = Task()
    data = request.json
    print('entered group routes-----------',data)

    newTask.title = data['title']
    newTask.notes = data['notes']
    newTask.links = data['links']

    if(data['deadline']):
        newTask.deadline = datetime.strptime(data['deadline'],'%Y-%m-%d')
    else:
        newTask.deadline = None
    newTask.tag = data['tag']
    newTask.difficulty = data['difficulty']
    newTask.group_id = group.id
    newTask.completed = False

    if(len(data['user_id'])):
        newTask.user_id = int(data['user_id'])
    else:
        newTask.user_id = None

    db.session.add(newTask)
    db.session.commit()
    return group.to_dict(),201

# Removing tasks from group
@group_routes.route('/<int:groupId>/tasks/<int:taskId>',methods=['DELETE'])
@login_required
def removeGroupTask(groupId,taskId):
    group = Group.query.get(groupId)
    if not group:
        return {'message':'group not found'},404

    ownerId = session['_user_id']

    if int(ownerId) != group.organizer.id:
        return {'message':'Forbidden'},401

    task = Task.query.filter(and_(Task.group_id == groupId))
    if not task:
        return {'message':'task not found'},404

    db.session.execute(delete(Task).
                       where(Task.id == taskId))
    db.session.commit()

    return group.to_dict(),200

#editting task of a group
@group_routes.route('/<int:groupId>/tasks/<int:taskId>',methods=['PUT'])
@login_required
def editGroupTask(groupId,taskId):
    group = Group.query.get(groupId)
    if not group:
        return {'message':'group not found'},404

    ownerId = session['_user_id']

    if int(ownerId) != group.organizer.id:
        return {'message':'Forbidden'},401

    task = Task.query.filter(and_(Task.group_id == groupId,Task.id == taskId)).first()
    if not task:
        return {'message':'task not found'},404


    data = request.json
    print('this is data----- userId',data)

    task.title = data['title']
    task.notes = data['notes']
    task.links = data['links']
    if data['deadline']:
        task.deadline = datetime.strptime(data['deadline'],'%Y-%m-%d')
    else:
        task.deadline = None
    task.tag = data['tag']
    task.difficulty = data['difficulty']
    task.group_id = group.id

    if(data['user_id']):
        task.user_id = int(data['user_id'])
    else:
        task.user_id = None


    db.session.commit()
    return group.to_dict(),200

# Adding  and removing user from a group
@group_routes.route('/<int:groupId>/user/<int:userId>',methods=["POST","DELETE"])
def addUser(userId,groupId):
    user = User.query.get(userId)
    if not user:
        return {'mesage':'user not found'},404

    group = Group.query.get(groupId)
    if not group:
        return {'message':'group not found'},404

    ownerId = session['_user_id']

    if int(ownerId) != group.organizer.id:
        return {'message':'Forbidden'},401

    groupUsers = [user.id for user in group.users]
    # adding a user
    if request.method == 'POST':
        if userId in groupUsers:
            return {'message':'User is already a member'}

        db.session.execute(insert(user_groups),
                        params = {"user_id":userId,
                                    "group_id":groupId}
                        )
        db.session.commit()
        return group.to_dict(),201

    #removing a user
    if request.method == 'DELETE':
        if userId not in groupUsers:
            return {'message':'User is not a memeber'}

        db.session.execute(delete(user_groups).
                           where(user_groups.c.user_id == userId).
                           where(user_groups.c.group_id == groupId))

        db.session.commit()

        return group.to_dict(),200

# Assigning group task to user
@group_routes.route('/tasks/<int:taskId>',methods=['POST'])
@login_required
def addUserTask(taskId):
    task = Task.query.get(taskId)
    if not task:
        return {'message':'task not found'}

    userId = int(session['_user_id'])
    task.user_id = userId

    db.session.commit()
    return task.to_dict(),200
