from .db import db, environment, add_prefix_for_prod, SCHEMA

class Tickets(db.Model):
    __tablename__ = 'tickets'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    tickets_sold = db.Column(db.Integer)
    tickets_available = db.Column(db.Integer)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    card_number = db.Column(db.String, nullable=False)
    csv = db.Column(db.String, nullable=False)
    zip_code= db.Column(db.String, nullable=False)

    events = db.relationship('Events', back_populates='ticket')
    user = db.relationship('User', back_populates='ticket')

    def to_dict(self):
        return{
            'id':self.id,
            'event':self.events.to_dict(),
            'user':self.user.to_dict(),
            'tickets_sold':self.tickets_sold,
            'tickets_available':self.tickets_available,
            'first_name':self.first_name,
            'last_name':self.last_name,
            'card_number':self.card_number,
            'csv':self.csv,
            'zip_code':self.zip_code
        }
