from .db import db, environment, SCHEMA, add_prefix_for_prod

class Categories(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    type = db.Column(db.String(100), nullable=False)

    events = db.relationship('Events', back_populates='category')

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            # 'events': [event.to_dict() for event in self.events]
        }
