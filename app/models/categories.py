from .db import db

class Categories(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    type = db.Column(db.String(100), nullable=False)

    events = db.relationship('Events', back_populates='category')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            # 'events': [event.to_dict() for event in self.events]
        }
