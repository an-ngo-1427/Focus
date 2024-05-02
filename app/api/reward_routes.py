from flask import Blueprint,request,session
from flask_login import login_required
from app.models import Reward,db
reward_routes = Blueprint('rewards',__name__)

@reward_routes.route('/')
@login_required
def getAllRewards():
    rewards = Reward.query.all()
    return {'Rewards':[reward.to_dict() for reward in rewards]},200

# getting rewards for a specific user
@reward_routes.route('/user/<int:userId>')
@login_required
def getUserRewards(userId):

    rewards = Reward.query.filter(Reward.receiver_id == userId)
    return {'Rewards':[reward.to_dict() for reward in rewards]},200

#getting rewards for a specific group
@reward_routes.route('/groups/<int:groupId>')
@login_required
def getGroupRewards(groupId):
    rewards = Reward.query.filter(Reward.group_id == groupId).all()

    return {'Rewards':[reward.to_dict() for reward in rewards]},200

# adding reward points
@reward_routes.route('/user/<int:userId>/add',methods=['POST'])
@login_required
def addRewardPoints(userId):
    data = request.json
    newReward = Reward()

    newReward.receiver_id = userId
    newReward.amount = data['amount']
    newReward.group_id = (int(data['group_id']) if 'group_id' in data else None)
    newReward.gifter_id = (int(data['gifter_id']) if 'gifter_id' in data else None)
    newReward.notes = (data['notes'] if 'notes' in data else "")
    newReward.task_id = (int(data['task_id']) if 'task_id' in data else None)
    db.session.add(newReward)
    db.session.commit()

    return newReward.to_dict(), 201

# editting a reward
@reward_routes.route('/<int:rewardId>/edit',methods=['PUT'])
@login_required
def editRewardPoints(rewardId):
    userId = int(session['_user_id'])
    reward = Reward.query.get(rewardId)
    if(userId != reward.gifter_id):
        return {'error':'Forbidden'},401
    if( not reward):
        return {'error':'Reward not found'},404

    data = request.json

    if("amount" not in data or int(data['amount']) <= 0):
        return {'error':'amount is required'},400

    reward.notes = data['notes']
    reward.amount = data['amount']

    db.session.commit()

    return reward.to_dict()
