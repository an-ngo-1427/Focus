
from .db import db,add_prefix_for_prod,environment,SCHEMA


class Reward(db.Model):
    __tablename__ = 'rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    receiver_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')))
    gifter_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')))
    task_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('tasks.id')))
    amount = db.Column(db.Integer,nullable = False)
    notes = db.Column(db.Text)
    group_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('groups.id')))
    receiver = db.relationship('User',back_populates='gifted_points',foreign_keys = [receiver_id])
    sender = db.relationship('User',back_populates='received_points',foreign_keys=[gifter_id])
    task = db.relationship('Task',foreign_keys = [task_id])
    # relationship between rewards and group
    group = db.relationship('Group',back_populates='rewards',foreign_keys=[group_id])
    def to_dict(self):
        return{
            'id':self.id,
            'receiver':self.receiver.to_dict(),
            'sender':self.sender.to_dict() if self.sender else None,
            'amount':self.amount,
            'notes':self.notes,
            'task':self.task.to_dict() if self.task else None
        }
