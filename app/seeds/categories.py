from ..models import db, Categories
import os

def seed_categories():
    entertainment = Categories(
        type='Film, Media, and Entertainment'
    )

    outdoors = Categories(
        type='Outdoors'
    )

    dining = Categories(
        type ='Dining'
    )

    db.session.add(entertainment)
    db.session.add(outdoors)
    db.session.add(dining)
    db.session.commit()

def undo_categories():
    if os.environ.get('FLASK_ENV') == 'development':
        db.session.execute('DELETE FROM categories;')
        db.session.commit()

    if os.environ.get('FLASK_ENV') == 'production':
        db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
        db.session.commit()
