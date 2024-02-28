from .db import db,add_prefix_for_prod,environment,SCHEMA
from datetime import datetime


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer,primary_key = True)
    title = db.Column(db.String,nullable = False)
    notes = db.Column(db.Text)
    links = db.Column(db.Text)
    deadline = db.Column(db.DateTime)
    tag = db.Column(db.String(255))
    difficulty = db.Column(db.Integer)
    completed = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime,default = datetime.now())
    updated_at = db.Column(db.DateTime,default = datetime.now(),onupdate = datetime.now())
    group_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('groups.id'),ondelete='CASCADE'))
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id'),ondelete='CASCADE'))

    user = db.relationship('User',back_populates='user_tasks')
    group = db.relationship('Group',back_populates = 'tasks')
    def to_dict(self):
        return {
            "notes":self.notes,
            "links":self.links,
            "deadline":self.deadline,
            "tag":self.tag,
            "difficulty":self.difficulty,
            "completed":self.completed,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at,
            "user" : self.user.to_dict(),
            "group_id" : self.group_id
        }
