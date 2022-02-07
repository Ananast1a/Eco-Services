"""
User model used to storing information about users, this module defines the
following classes:
- `User`, user model
"""
from sorting_app.db import db
from werkzeug.security import generate_password_hash


class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String())
    email = db.Column(db.String(100))
    questions = db.relationship('Question', backref='user', lazy=True)

    def __init__(self, username, password, email=None):
        self.username = username
        self.password = password
        self.email = email

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def save_to_db(self):
        self.password = generate_password_hash(self.password)
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
