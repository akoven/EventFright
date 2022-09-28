from flask.cli import AppGroup
from .users import seed_users, undo_users
from .events import seed_events, undo_events
from .categories import seed_categories, undo_categories
from .venues import seed_venues, undo_venues

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_venues()
    seed_events()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_events()
    undo_categories()
    undo_venues()
