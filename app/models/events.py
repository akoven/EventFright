from .db import db

class Events(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key = True)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    event_image = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, timezone=False, nullable=False)
    capacity = db.Column(db.Integer)

    user = db.relationship('User', back_populates='events')
    venue = db.relationship('Venues', back_populates='events')
    category = db.relationship('Categories', back_populates='events')
    tickets = db.relationship('Tickets', back_populates='event')
