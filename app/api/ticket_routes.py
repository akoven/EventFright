from flask import Blueprint, request
from app.models import db, Tickets
from app.forms import TicketForm
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages



ticket_routes = Blueprint('ticket_routes', __name__)

@ticket_routes.route('/')
def all_tickets():
    if current_user:
        all_tickets = Tickets.query.all()
        tickets = [ticket.to_dict() for ticket in all_tickets]
        response = {'tickets':tickets}
        return response
    else:
        return '403: Unauthorized User'

@ticket_routes.route('/', methods=['POST'])
def add_ticket():
    new_ticket = TicketForm()
    new_ticket['csrf_token'].data = request.cookies['csrf_token']

    event_id = new_ticket.data['event_id']
    user_id = new_ticket.data['user_id']
    tickets_sold = new_ticket.data['tickets_sold']
    tickets_available = new_ticket.data['tickets_available']
    first_name = new_ticket.data['first_name']
    last_name = new_ticket.data['last_name']
    card_number = new_ticket.data['card_number']
    csv_number = new_ticket.data['csv']
    zip_code = new_ticket.data['zip_code']

    if new_ticket.validate_on_submit():
        ticket=Tickets(
            event_id = event_id,
            user_id = user_id,
            tickets_sold = tickets_sold,
            tickets_available = tickets_available,
            first_name = first_name,
            last_name = last_name,
            card_number = card_number,
            csv = csv_number,
            zip_code = zip_code
        )

        db.session.add(ticket)
        db.session.commit()
        return ticket.to_dict()
    else:
        # print('BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT',new_event,'BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT BACKEND EVENT')
        # print('********************************VALIDATION ERRORS*********************',validation_errors_to_error_messages(new_ticket.errors))
        return {'errors': validation_errors_to_error_messages(new_ticket.errors)}, 401

@ticket_routes.route('/<ticket_id>', methods=['DELETE'])
def delete_tickets(ticket_id):
    ticket = Tickets.query.get(ticket_id)
    if not ticket:
        return "Error 404: The registrations you're looking for could not be found"

    db.session.delete(ticket)
    db.session.commit()

    return 'registration has been canceled'
