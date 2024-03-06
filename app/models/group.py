from .db import db,SCHEMA,add_prefix_for_prod,environment

user_groups = db.Table(
    'user_groups',
    db.Column('user_id',db.Integer,db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('group_id',db.Integer,db.ForeignKey(add_prefix_for_prod('groups.id')))
)
if environment == "production":
    user_groups.schema = SCHEMA

class Group(db.Model):
    __tablename__ = 'groups'

    if (environment == 'production'):
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(255),nullable=False)
    organizer_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')))
    image_url = db.Column(db.String)

    users = db.relationship('User',secondary = 'user_groups',back_populates = 'groups')
    organizer = db.relationship('User',back_populates = 'owner_groups')
    tasks = db.relationship('Task',back_populates = 'group',cascade = "all, delete")
    def to_dict(self):
        return{
            "id":self.id,
            "name":self.name,
            "users":[user.to_dict() for user in self.users],
            "organizer" : self.organizer.to_dict(),
            "tasks": [task.to_dict() for task in self.tasks],
            "image_url": self.image_url
        }
