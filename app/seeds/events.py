# from datetime import datetime
# from zoneinfo import ZoneInfo
from ..models import db,Events
# import pytz
import os

def seed_events():
    haunted_house = Events(
        host_id=1,
        venue_id=1,
        category_id=1,
        event_name="Halloween Nights at Eastern State Penitentiary",
        description="Former prison turned halloween attraction",
        event_image="https://whyy.org/wp-content/uploads/2019/10/2018-07-25-e-lee-philadelphia-eastern-state-penitentiary-historic-preservation-training.jpg",
        # date=datetime(2022,10,31,22,00,00),
        date = '10/31/2022, 10:00:00 PM',
        capacity=200,
        price_per_guest = 30.00
    )

    haunted_hay_ride=Events(
        host_id=1,
        venue_id=2,
        category_id=2,
        event_name="Haunted Woods of Smyer",
        description="Outdoor horror themed attraction",
        event_image="https://s.wsj.net/public/resources/images/BN-KU714_NYSCEN_P_20151018170719.jpg",
        date='10/25/2022, 10:00:00 PM',
        capacity=200,
        price_per_guest = 10.00
    )
    haunted_brunch=Events(
        host_id=2,
        venue_id=3,
        category_id=3,
        event_name="Brunch with Ghosts",
        description="Have brunch with friends or hotel guests who never checked out",
        event_image="https://www.newyorkupstate.com/resizer/jANAs6ra9sFhzzlrroSGsO8avDI=/800x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/H3KR2QJGAVGLRJHFSAV3MVWZ5U.jpg",
        # date=datetime(2022,10,5,12,00,00),
        date='10/05/2022 12:00:00 PM',
        capacity=30,
        price_per_guest = 25.00
    )

    db.session.add(haunted_house)
    db.session.add(haunted_hay_ride)
    db.session.add(haunted_brunch)

    db.session.commit()

def undo_events():

    if os.environ.get('FLASK_ENV') == 'development':
        db.session.execute('DELETE FROM events;')
        db.session.commit()

    if os.environ.get('FLASK_ENV') == 'production':
        db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
        db.session.commit()
