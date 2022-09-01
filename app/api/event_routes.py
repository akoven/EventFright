from flask import Blueprint, request
from app.models import Events, db
from app.forms import EventForm
from flask_login import current_user

event_routes = Blueprint("event_routes", __name__)

@event_routes.route("/")
def all_events():
    print('***************CURRENT USER******************** ',current_user)
    if current_user:
        all_events = Events.query.all()
        events = [event.to_dict() for event in all_events]
        print('*********************EVENTS FROM API BACKEND*********************************',events)
        response = {'events':events}
        return response
    else:
        return '403: Unauthorized User'

@event_routes.route('/',methods=['POST'])
def user_events():
    new_event = EventForm()

    new_event['csrf_token'].data = request.cookies['csrf_token']
    host_id = new_event.data['host_id']
    venue = new_event.data['venue']
    category = new_event.data['category']
    event_name = new_event.data['event_name']
    description = new_event.data['description']
    event_image = new_event.data['event_image']
    date = new_event.data['date']
    capacity = new_event.data['capacity']

    if new_event.validate_on_submit() and current_user == host_id:
        event=Events(
            host_id = host_id,
            venue = venue,
            category = category,
            event_name = event_name,
            description = description,
            event_image = event_image,
            date = date,
            capacity = capacity
        )

        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    else:
        return '403: Unauthorized User'
