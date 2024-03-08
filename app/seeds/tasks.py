from app.models import db, User, environment, SCHEMA,Task
from sqlalchemy.sql import text
from datetime import datetime
def convertDate(date):
    dateObj = datetime.strptime(date,"%m/%d/%Y")
    return dateObj
# Adds a demo user, you can add other users here if you want
def seed_tasks():

    task1 = Task(title ='Task 1',notes = 'notes for task 1',deadline = convertDate("01/12/2024"),tag = 'chores',difficulty = 2,completed = True,group_id = 1,user_id=2)
    task2 = Task(title ='Task 2',notes = 'notes for task 2',deadline =convertDate("01/16/2024"),tag = 'school',difficulty = 4,completed = True,group_id = 1,user_id=3 )
    task3 = Task(title ='Task 3',notes = 'notes for task 3',deadline =convertDate("06/12/2024"),tag = 'creative',difficulty = 1,completed = False,group_id = 1,user_id=3 )
    task4 = Task(title ='Task 4',notes = 'notes for task 4',deadline =convertDate("06/26/2024"),tag = 'school',difficulty = 2,completed = False,group_id = 1 )
    task5 = Task(title ='Task 5',notes = 'notes for task 5',deadline =convertDate("01/01/2024"),tag = 'chores',difficulty = 4,completed = False,group_id = 1 )
    task6 = Task(title ='Task 6',notes = 'notes for task 6',deadline =convertDate("01/03/2024"),tag = 'creative',difficulty = 3,completed = True,group_id = 1,user_id=2 )
    task7 = Task(title ='Task 7',notes = 'notes for task 7',deadline =convertDate("05/12/2024"),tag = 'school',difficulty = 5,completed = True,group_id = 1,user_id=3)
    task8 = Task(title ='Task 8',notes = 'notes for task 8',deadline =convertDate("05/19/2024"),tag = 'creative',difficulty = 2,completed = False,group_id = 1,user_id=2)
    task9 = Task(title ='Task 9',notes = 'notes for task 9',deadline =convertDate("01/12/2024"),tag = 'creative',difficulty = 3,completed = False,group_id = 1 )
    task10 = Task(title ='Task 10',notes = 'notes for task 10',deadline =convertDate("01/12/2024"),tag = 'school',difficulty = 1,completed = False,group_id =1 )
    task11 = Task(title ='Task 11',notes = 'notes for task 11',deadline =convertDate("07/12/2024"),tag = 'creative',difficulty = 2,completed = False,group_id = 2,user_id=1)
    task12 = Task(title ='Task 12',notes = 'notes for task 12',deadline =convertDate("07/12/2024"),tag = 'creative',difficulty = 1,completed = True,group_id =2,user_id=1 )
    task13 = Task(title ='Task 13',notes = 'notes for task 13',deadline =convertDate("01/20/2024"),tag = 'chores',difficulty = 4,completed = True,group_id =2,user_id = 1)
    task14 = Task(title ='Task 14',notes = 'notes for task 14',deadline =convertDate("01/12/2024"),tag = 'creative',difficulty = 2,completed = False,group_id =2,user_id = 3)
    task15 = Task(title ='Task 15',notes = 'notes for task 15',deadline =convertDate("07/12/2024"),tag = 'chores',difficulty = 5,completed = True,group_id =2,user_id = 3)
    task16 = Task(title ='Task 16',notes = 'notes for task 16',deadline =convertDate("08/12/2024"),tag = 'creative',difficulty = 3,completed = True,group_id =2,user_id = 1)
    task17 = Task(title ='Task 17',notes = 'notes for task 17',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 1,completed = False,group_id =2,user_id = 3)
    task18 = Task(title ='Task 18',notes = 'notes for task 18',deadline =convertDate("08/12/2024"),tag = 'creative',difficulty = 4,completed = False,group_id =2,user_id = 1)
    task19 = Task(title ='Task 19',notes = 'notes for task 19',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =2,user_id = 1)
    task20 = Task(title ='Task 20',notes = 'notes for task 20',deadline =convertDate("08/12/2024"),tag = 'creative',difficulty = 1,completed = False,group_id =3,user_id=1)
    task21 = Task(title ='Task 21',notes = 'notes for task 21',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=1)
    task22 = Task(title ='Task 22',notes = 'notes for task 22',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=1)
    task23 = Task(title ='Task 23',notes = 'notes for task 23',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=2)
    task24 = Task(title ='Task 24',notes = 'notes for task 24',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=2)
    task25 = Task(title ='Task 25',notes = 'notes for task 25',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=2)
    task26 = Task(title ='Task 26',notes = 'notes for task 26',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=2)
    task27 = Task(title ='Task 27',notes = 'notes for task 27',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=1)
    task28 = Task(title ='Task 28',notes = 'notes for task 28',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3)
    task29 = Task(title ='Task 29',notes = 'notes for task 29',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3)
    task30 = Task(title ='Task 30',notes = 'notes for task 30',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,group_id =3,user_id=1)
    task31 = Task(title ='Task 31',notes = 'notes for task 31',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,user_id=1)
    task32 = Task(title ='Task 32',notes = 'notes for task 32',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,user_id=2)
    task33 = Task(title ='Task 33',notes = 'notes for task 33',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = False,user_id=1)
    task34 = Task(title ='Task 34',notes = 'notes for task 34',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = True,user_id=3)
    task35 = Task(title ='Task 35',notes = 'notes for task 35',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = True,user_id=3)
    task36 = Task(title ='Task 36',notes = 'notes for task 36',deadline =convertDate("08/12/2024"),tag = 'Exercise',difficulty = 3,completed = True,user_id=1)

    db.session.add_all([task1,task2,task3,task4,task5,task6,task6,task7,task8,task9,task10,task11,task12,task13,task14,task15,task16,task17,task18,task19,task20,task21,task22,task23,task24,task25,task26,task27,task28,task29,task30,task31,task32,task33,task34,task35,task36])
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
