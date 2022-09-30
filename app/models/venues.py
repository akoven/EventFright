from .db import db

class Venues(db.Model):
    __tablename__ = 'venues'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)

    events = db.relationship('Events', back_populates='venue')

    def to_dict(self):
        return{
            'id':self.id,
            'name':self.name,
            'address':self.address,
            'city':self.city,
            'state':self.state,
            'zip_code':self.zip_code,
            'latitude':self.latitude,
            'longitude':self.longitude
        }
