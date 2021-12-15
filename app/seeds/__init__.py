from flask.cli import AppGroup
from .users import seed_users, undo_users
from .hangouts import seed_hangouts, undo_hangouts
from .RSVPs import seed_RSVPs, undo_RSVPs

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_hangouts()
    seed_RSVPs()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_hangouts()
    undo_RSVPs()
    # Add other undo functions here
