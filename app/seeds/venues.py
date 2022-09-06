from ..models import db, Venues
import os

def seed_venues():
    old_penitentiary = Venues(
       name = 'Eastern State Penitentiary',
       address = '2027 Fairmount Ave' ,
       state = 'PA',
       zip_code = '19130'
    )

    haunted_woods_smyer = Venues(
        name = 'Haunted Woods of Smyer',
        address = 'TX-114 Owl Road',
        city = 'Smyer',
        state = 'TX',
        zip_code='79407'
    )

    hart_hotel = Venues(
        name = 'Hart House Hotel',
        address = '115 West Center St',
        city  = 'Medina',
        state = 'NY',
        zip_code = '14103'
    )

    db.session.add(old_penitentiary)
    db.session.add(haunted_woods_smyer)
    db.session.add(hart_hotel)
    db.session.commit()

def undo_venues():

    if os.environ.get('FLASK_ENV') == 'development':
        db.session.execute('DELETE FROM venues;')
        db.session.commit()

    if os.environ.get('FLASK_ENV') == 'production':
        db.session.execute('TRUNCATE venues RESTART IDENTITY CASCADE;')
        db.session.commit()
