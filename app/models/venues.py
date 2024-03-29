from .db import db, environment, add_prefix_for_prod, SCHEMA

class Venues(db.Model):
    __tablename__ = 'venues'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)

    events = db.relationship('Events', back_populates='venue')

    def to_dict(self):
        return{
            'id':self.id,
            'user_id': self.user_id,
            'name':self.name,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'zip_code':self.zip_code,
            'latitude':self.latitude,
            'longitude':self.longitude
        }
