import re
from flask import Blueprint, request
import os
from app.models import Events, db
from app.forms import EventForm
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.s3 import (get_unique_filename,upload_to_s3,extensions)

event_routes = Blueprint("event_routes", __name__)

@event_routes.route("/")
def all_events():
    # print('***************CURRENT USER******************** ',current_user)
    if current_user:
        all_events = Events.query.all()
        events = [event.to_dict() for event in all_events]
        # print('*********************EVENTS FROM API BACKEND*********************************',events)
        response = {'events':events}
        # print('************************RESPONSE****************** ', response)
        # print('OS ENVIRON: ',os.environ)
        return response
    else:
        return '403: Unauthorized User'

@event_routes.route('/',methods=['POST'])
def add_events():
    new_event = EventForm()
    # new_event.data = request.get_json()
    # new_event['csrf_token'].data['csrf_token'] = request.cookies['csrf_token']
    new_event['csrf_token'].data = request.cookies['csrf_token']


    # print('**********************************',new_event['csrf_token'].data)



    # event_image.filename = get_unique_filename(event_image.filename)
    print('***********************DATA*********************',new_event.data)
    print('*******************FILE*************************',request.files)

    host_id = new_event.data['host_id']
    venue_id = new_event.data['venue_id']
    category_id = new_event.data['category_id']
    event_name = new_event.data['event_name']
    description = new_event.data['description']
    # event_image = new_event.data['event_image']
    event_image = request.files['event_image']
    date = new_event.data['date']
    capacity = new_event.data['capacity']
    price = new_event.data['price_per_guest']

    print('*******************AFTER FILE*************************',event_image.filename)
    print(new_event.data['event_image'].filename)

    if new_event.validate_on_submit():

        if not extensions(event_image.filename):
            return {"errors":"file type is not permitted"}
        event_image.filename = get_unique_filename(event_image.filename)
        upload = upload_to_s3(event_image)
        # print('!!!!!!!!!!!!!!!!!!!!!!NEW EVENT FROM BACKEND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', new_event.data)
        if "url" not in upload:
            return upload, 400
        # data = new_event.data
        image_url = upload["url"]
        event=Events(
            host_id = host_id,
            venue_id = venue_id,
            category_id = category_id,
            event_name = event_name,
            description = description,
            # event_image = event_image,
            event_image = image_url,
            date = date,
            capacity = capacity,
            price_per_guest = price
        )
        print('BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT',new_event,'BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT')
        db.session.add(event)
        db.session.commit()
        return event.to_dict()
    else:
        # print('BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT',new_event,'BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT')
        # print('********************************VALIDATION ERRORS*********************',validation_errors_to_error_messages(new_event.errors))
        return {'errors': validation_errors_to_error_messages(new_event.errors)}, 401


@event_routes.route('/<event_id>', methods=['PUT'])

def edit_event(event_id):
    data = request.json
    # print('DATA FROM BACKEND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', data)
    event = Events.query.get(event_id)
    # print('*******************event from backend**************** ', event.event_name)
    # print(type(event_id))
    if not event:
        return "Error 404: The event you're looking for couldn't be found"

    updated_event = EventForm()

    updated_event['csrf_token'].data = request.cookies['csrf_token']

    # if updated_event.validate_on_submit():
    # print('*********made it to validate on submit*****************')


    # venue_id = updated_event.data['venue_id']
    # category_id = updated_event.data['category_id']
    # event_name = updated_event.data['event_name']
    # description = updated_event.data['description']
    # event_image = updated_event.data['event_image']
    # date = updated_event.data['date']
    # capacity = updated_event.data['capacity']

    venue_id = data['venue_id']
    category_id = data['category_id']
    event_name = data['event_name']
    description = data['description']
    event_image = data['event_image']
    date = data['date']
    capacity = data['capacity']
    price_per_guest = data['price']



    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!venue id datatype!!!!!!!!!!!!!!!!!!!!!! ', type(venue_id))
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!category id datatype!!!!!!!!!!!!!!!!!!!!!! ', type(category_id))
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!event name datatype!!!!!!!!!!!!!!!!!!!!!! ', type(event_name))
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!description datatype!!!!!!!!!!!!!!!!!!!!!! ', type(description))
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!date datatype!!!!!!!!!!!!!!!!!!!!!! ', type(date))
    # print('!!!!!!!!!!!!!!!!!!!!!!!!!!capacity datatype!!!!!!!!!!!!!!!!!!!!!! ', type(capacity))


    event.venue_id = venue_id
    event.category_id = category_id
    event.event_name = event_name
    event.description = description
    event.event_image = event_image
    event.date = date
    event.capacity = capacity
    event.price_per_guest = price_per_guest

    db.session.commit()
    # print('*************made it past session.commit***************************')
    return event.to_dict()
    # else:
    #     print('********************************VALIDATION ERRORS*********************',validation_errors_to_error_messages(updated_event.errors))
    #     return {'errors': validation_errors_to_error_messages(updated_event.errors)}, 401


@event_routes.route('/<event_id>', methods=['DELETE'])
def delete_events(event_id):
    event = Events.query.get(event_id)
    # print('*****************EVENT ID*********************:', event_id)
    # print('*************************EVENT TO BE DELETED***************************: ', event.event_name)
    if not event:
        return "Error 404: The event you're looking for couldn't be found"

    db.session.delete(event)
    db.session.commit()

    return 'event has been deleted'
