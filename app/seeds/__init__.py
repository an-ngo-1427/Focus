from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import undo_groups,seed_groups
from .tasks import undo_tasks,seed_tasks
from .user_groups import undo_user_groups,seed_user_groups
from app.models.db import db, environment, SCHEMA
from .rewards import seed_rewards,undo_rewards

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_tasks()
        undo_rewards()
        undo_user_groups()
        undo_groups()
        undo_users()
    seed_users()
    seed_groups()
    seed_user_groups()
    seed_tasks()
    seed_rewards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_rewards()
    undo_tasks()
    undo_user_groups()
    undo_groups()
    undo_users()
    # Add other undo functions here
