from app.models import user_groups
from app.models.db import db,environment,SCHEMA
from sqlalchemy.sql import text

def seed_user_groups():
    user_groups_data = [
        {'user_id':1,'group_id':1},
        {'user_id':1,'group_id':2},
        {'user_id':1,'group_id':3},
        {'user_id':2,'group_id':1},
        {'user_id':2,'group_id':2},
        {'user_id':2,'group_id':3},
    ]

    db.session.execute(user_groups.insert(),user_groups_data)
    db.session.commit()

def undo_user_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_groups"))

    db.session.commit()
