from .db import db

class Events(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key = True)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    event_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    event_image = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    price_per_guest = db.Column(db.Float)

    user = db.relationship('User', back_populates='events')
    venue = db.relationship('Venues', back_populates='events')
    category = db.relationship('Categories', back_populates='events')
    ticket = db.relationship('Tickets', back_populates='events')

    def to_dict(self):
        return{
            'id':self.id,
            'event_name':self.event_name,
            'description':self.description,
            'venue':self.venue.to_dict(),
            'category':self.category.to_dict(),
            'event_image':self.event_image,
            'date':self.date,
            'capacity':self.capacity,
            'price':self.price_per_guest,
            'user':self.user.to_dict(),
        }
            # 'tickets':[ticket.to_dict() for ticket in self.ticket]
# 'tickets':[ticket.to_dict() for ticket in self.tickets]
