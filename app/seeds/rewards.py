from app.models import db,environment,SCHEMA,Reward
from sqlalchemy.sql import text
import random
from app.models import db, environment

def seed_rewards():
    reward1 = Reward(receiver_id = 1,gifter_id = 2, amount = 5,group_id = 1)
    reward2 = Reward(receiver_id=3, gifter_id=4, amount=7)
    reward3 = Reward(receiver_id=2, gifter_id=5, amount=10)
    reward4 = Reward(receiver_id=6, gifter_id=1, amount=3)
    reward5 = Reward(receiver_id=4, gifter_id=3, amount=5)
    reward6 = Reward(receiver_id=5, gifter_id=2, amount=2)
    reward7 = Reward(receiver_id=1, gifter_id=6, amount=8)
    reward8 = Reward(receiver_id=3, gifter_id=7, amount=6)
    reward9 = Reward(receiver_id=4, gifter_id=1, amount=4)
    reward10 = Reward(receiver_id=2, gifter_id=3, amount=7, group_id = 2)
    reward11 = Reward(receiver_id=1, gifter_id=5, amount=5)
    reward12 = Reward(receiver_id=6, gifter_id=2, amount=4)
    reward13 = Reward(receiver_id=7, gifter_id=4, amount=3)
    reward14 = Reward(receiver_id=5, gifter_id=1, amount=9)
    reward15 = Reward(receiver_id=3, gifter_id=5, amount=6)
    reward16 = Reward(receiver_id=1, gifter_id=2, amount=10, group_id = 3)
    reward17 = Reward(receiver_id=5, gifter_id=3, amount=8)
    reward18 = Reward(receiver_id=2, gifter_id=6, amount=7)
    reward19 = Reward(receiver_id=7, gifter_id=1, amount=5)
    reward20 = Reward(receiver_id=4, amount= 3,task_id=18)
    reward21 = Reward(receiver_id=4, amount= 3,task_id=19)
    reward22 = Reward(receiver_id=4, amount= 3,task_id=20)
    reward23 = Reward(receiver_id=4, amount= 3,task_id=21)
    reward24 = Reward(receiver_id=4, amount= 3,task_id=22)
    reward25 = Reward(receiver_id=4, amount= 3,task_id=27)

    def generate_random_string(length):
        words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit']
        return ' '.join(random.choice(words) for i in range(length))

    reward1.notes = generate_random_string(10)
    reward2.notes = generate_random_string(10)
    reward3.notes = generate_random_string(10)
    reward4.notes = generate_random_string(10)
    reward5.notes = generate_random_string(10)
    reward6.notes = generate_random_string(10)
    reward7.notes = generate_random_string(10)
    reward8.notes = generate_random_string(10)
    reward9.notes = generate_random_string(10)
    reward10.notes = generate_random_string(10)
    reward11.notes = generate_random_string(10)
    reward12.notes = generate_random_string(10)
    reward13.notes = generate_random_string(10)
    reward14.notes = generate_random_string(10)
    reward15.notes = generate_random_string(10)
    reward16.notes = generate_random_string(10)
    reward17.notes = generate_random_string(10)
    reward18.notes = generate_random_string(10)
    reward19.notes = generate_random_string(10)
    reward20.notes = generate_random_string(10)

    db.session.add_all([reward1, reward2, reward3, reward4, reward5, reward6, reward7, reward8, reward9, reward10, reward11, reward12, reward13, reward14, reward15, reward16, reward17, reward18, reward19, reward20, reward21,reward22,reward23,reward24,reward25])
    db.session.commit()

def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards"))

    db.session.commit()
