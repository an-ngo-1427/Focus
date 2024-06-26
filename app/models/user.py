from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255),nullable = False)
    last_name = db.Column(db.String(255),nullable = False)

    groups = db.relationship('Group',secondary = 'user_groups', back_populates = 'users')
    user_tasks = db.relationship('Task',back_populates='user')

    owner_groups = db.relationship('Group',back_populates = 'organizer')

    # rewards table relationships
    gifted_points = db.relationship('Reward',back_populates='receiver',foreign_keys='Reward.receiver_id')
    received_points = db.relationship('Reward',back_populates = 'sender',foreign_keys = 'Reward.gifter_id')
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "first_name":self.first_name,
            "last_name":self.last_name
        }
