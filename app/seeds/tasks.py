from app.models import db, User, environment, SCHEMA,Task
from sqlalchemy.sql import text
from datetime import datetime
def convertDate(date):
    dateObj = datetime.strptime(date,"%m/%d/%Y")
    return dateObj
# Adds a demo user, you can add other users here if you want
def seed_tasks():

    task1 = Task(title ='1',notes = 'notes for task 1',deadline = convertDate("01/12/2024"),tag = 'creative',difficulty = 2,completed = True,group_id = 1,user_id=2)
    task2 = Task(title ='2',notes = 'notes for task 2',deadline =convertDate("01/16/2024"),tag = 'creative',difficulty = 4,completed = True,group_id = 1 )
    task3 = Task(title ='3',notes = 'notes for task 3',deadline =convertDate("06/12/2024"),tag = 'creative',difficulty = 1,completed = False,group_id = 1 )
    task4 = Task(title ='4',notes = 'notes for task 4',deadline =convertDate("06/26/2024"),tag = 'creative',difficulty = 2,completed = True,group_id = 1 )
    task5 = Task(title ='5',notes = 'notes for task 5',deadline =convertDate("01/01/2024"),tag = 'creative',difficulty = 4,completed = True,group_id = 2 )
    task6 = Task(title ='6',notes = 'notes for task 6',deadline =convertDate("01/03/2024"),tag = 'creative',difficulty = 3,completed = False,group_id = 2,user_id=2 )
    task7 = Task(title ='7',notes = 'notes for task 7',deadline =convertDate("05/12/2024"),tag = 'creative',difficulty = 5,completed = True,group_id = 2 )
    task8 = Task(title ='8',notes = 'notes for task 8',deadline =convertDate("05/19/2024"),tag = 'creative',difficulty = 2,completed = True,group_id = 2 )
    task9 = Task(title ='9',notes = 'notes for task 9',deadline =convertDate("01/12/2024"),tag = 'creative',difficulty = 3,completed = True,group_id = 3 )
    task10 = Task(title ='10',notes = 'notes for task 10',deadline =convertDate("01/12/2024"),tag = 'creative',difficulty = 1,completed = True,group_id = 3 )
    task11 = Task(title ='11',notes = 'notes for task 11',deadline =convertDate("07/12/2024"),tag = 'creative',difficulty = 2,completed = False,group_id = 3,user_id=2 )
    task12 = Task(title ='12',notes = 'notes for task 12',deadline =convertDate("07/12/2024"),tag = 'creative',difficulty = 1,completed = True,group_id = 3 )
    task13 = Task(title ='13',notes = 'notes for task 13',deadline =convertDate("01/20/2024"),tag = 'creative',difficulty = 4,completed = True,user_id = 1)
    task14 = Task(title ='14',notes = 'notes for task 14',deadline =convertDate("01/12/2024"),tag = 'creative',difficulty = 2,completed = False,user_id = 1)
    task15 = Task(title ='15',notes = 'notes for task 15',deadline =convertDate("07/12/2024"),tag = 'creative',difficulty = 5,completed = True,user_id = 2)
    task16 = Task(title ='16',notes = 'notes for task 16',deadline =convertDate("08/12/2024"),tag = 'creative',difficulty = 3,completed = True,user_id = 3)
    db.session.add_all([task1,task2,task3,task4,task5,task6,task6,task7,task8,task9,task10,task11,task12,task13,task14,task15,task16])
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
