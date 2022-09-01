from ..models import db, Categories

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
    db.session.execute('DELETE FROM categories;')
    db.session.commit()
