"""
Service model used to storing information about services, this module defines the
following classes:
- `Service`, service model
- `Ratings`, model for storing individual rating from users to services.
"""
from sorting_app.db import db
from sqlalchemy.ext.mutable import MutableList

from sorting_app.models.question import Question


class Rating(db.Model):  # Rating - Association; child-user; parent - service
    __tablename__ = 'ratings'
    __table_args__ = {'extend_existing': True}

    user_id = db.Column(db.ForeignKey('users.id'), primary_key=True)
    service_id = db.Column(db.ForeignKey('services.service_id'), primary_key=True)
    rating = db.Column(db.Integer)

    def __init__(self, user_id, service_id, rating):
        self.user_id = user_id
        self.service_id = service_id
        self.rating = rating

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


class Service(db.Model):
    __tablename__ = 'services'
    __table_args__ = {'extend_existing': True}

    service_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200))
    coordinates = db.Column(MutableList.as_mutable(db.PickleType))
    working_time = db.Column(db.String(250))
    rating = db.Column(db.Float)
    types_of_waste = db.Column(MutableList.as_mutable(db.PickleType))
    payment_condition = db.Column(db.Boolean)
    delivery_option = db.Column(db.Boolean)
    email = db.Column(db.String(150))
    phone = db.Column(db.String(30))
    picture = db.Column(db.String(400))
    questions = db.relationship('Question', backref='service', lazy=True)

    def __init__(self, name=None, address=None, coordinates=None, working_time=None, rating=None, types_of_waste=None,
                 payment_condition=None, delivery_option=None, email=None, phone=None, picture=None):
        self.name = name
        self.address = address
        self.coordinates = coordinates
        self.working_time = working_time
        self.rating = rating
        self.types_of_waste = types_of_waste
        self.payment_condition = payment_condition
        self.delivery_option = delivery_option
        self.email = email
        self.phone = phone
        self.picture = picture

    def __repr__(self):
        return '<Service %r>' % self.name

    def to_dict(self):
        questions_for_service = Question.query.filter_by(service_id=self.service_id)

        return {
            'service_id': self.service_id,
            'name': self.name,
            'address': self.address,
            'coordinates': self.coordinates,
            'working_time': self.working_time,
            'rating': self.rating,
            'types_of_waste': self.types_of_waste,
            'payment_condition': self.payment_condition,
            'delivery_option': self.delivery_option,
            'email': self.email,
            'phone': self.phone,
            'picture': self.picture,
            'questions': [question.to_dict() for question in questions_for_service]
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
