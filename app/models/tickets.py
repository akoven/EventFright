from .db import db

class Tickets(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    events = db.relationship('Events', back_populates='tickets')


    def to_dict(self):
        return{
            'event_id':self.event_id,
            'user_id':self.user_id,
        }
