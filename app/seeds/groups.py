from app.models import db, User, environment, SCHEMA,Group
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_groups():

    group1 = Group(name = 'group 1',organizer_id = 1,image_url = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Creeperasha_Linux_test_image_upload.png')
    group2 = Group(name = 'group 2',organizer_id = 2,image_url = 'https://images.creativefabrica.com/products/previews/2023/09/04/vgPFmTLFu/2UvlBWvRTsIqU2qHw6kvCml1iDf-mobile.jpg')
    group3 = Group(name = 'group 3',organizer_id = 3,image_url = 'https://img.freepik.com/free-vector/hot-dog-street-snack-isolated-transparent_107791-18353.jpg')

    db.session.add_all([group1,group2,group3])
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))

    db.session.commit()
