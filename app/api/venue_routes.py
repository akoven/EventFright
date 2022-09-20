from flask import Blueprint, request
from app.models import Venues, db
from app.forms import VenueForm
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages


venue_routes = Blueprint('venue_routes', __name__)

@venue_routes.route('/')
def load_all_venues():
    if current_user:
        all_venues = Venues.query.all()
        venues = [venue.to_dict() for venue in all_venues]
        response = {'venues':venues}
        return response
    else:
        return '403: Unauthorized User'

@venue_routes.route('/',methods=['POST'])
def add_new_venue():
    new_venue = VenueForm()
    new_venue['csrf_token'].data = request.cookies['csrf_token']

    name = new_venue.data['name']
    address = new_venue.data['address']
    city = new_venue.data['city']
    state = new_venue.data['state']
    zip_code = new_venue.data['zip_code']
    latitude = new_venue.data['latitude']
    longitude = new_venue.data['longitude']

    if new_venue.validate_on_submit():
        venue=Venues(
            name = name,
            address = address,
            city = city,
            state = state,
            zip_code = zip_code,
            latitude = latitude,
            longitude = longitude
        )

        db.session.add(venue)
        db.session.commit()
        return venue.to_dict()
    else:
        print('********************************VALIDATION ERRORS*********************',validation_errors_to_error_messages(new_venue.errors))
        return {'errors': validation_errors_to_error_messages(new_venue.errors)}, 401

@venue_routes.route('/<venue_id>', methods=['PUT'])
def edit_venue(venue_id):
    venue = Venues.query.get(venue_id)

    if not venue:
        return "Error 404: The venue you're looking for couldn't be found"

    updated_venue = VenueForm()

    updated_venue['csrf_token'].data = request.cookies['csrf-token']
    name = updated_venue.data['name']
    address = updated_venue.data['address']
    city = updated_venue.data['city']
    state = updated_venue.data['state']
    zip_code = updated_venue.data['zip_code']
    latitude = updated_venue.data['latitude']
    longitude = updated_venue.data['longitude']

    venue.name = name,
    venue.address = address,
    venue.city = city,
    venue.state = state,
    venue.zip_code = zip_code,
    venue.latitude = latitude,
    venue.longitude = longitude

    db.session.commit()
    return venue.to_dict()

@venue_routes.route('/<venue_id>', methods=['DELETE'])
def delete_venues(venue_id):
    venue = Venues.query.get(venue_id)

    if not venue:
        return "Error 404: The venue you're looking for couldn't be found"

    db.session.delete(venue)
    db.session.commit()
