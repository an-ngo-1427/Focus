from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',first_name = 'demo',last_name = 'LastDemo')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name = 'Marnie',last_name = 'LastMarnie')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name = 'bobbie', last_name = 'LastBobby')
    user1 = User(
        username='user1', email='user1@aa.io', password='password', first_name = 'user1', last_name = 'Lastuser1')
    user2 = User(
        username='user2', email='user2@aa.io', password='password', first_name = 'user2', last_name = 'lastuser2')
    user3 = User(
        username='user3', email='user3@aa.io', password='password', first_name = 'user3', last_name = 'Lastuser3')
    user4 = User(
        username='user4', email='user4@aa.io', password='password', first_name = 'user4', last_name = 'Lastuser4')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
