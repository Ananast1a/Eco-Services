"""
Question model used to storing questions about Services, this module defines the
following classes:
- `Question`, question model
"""
from sorting_app.db import db


class Question(db.Model):
    __tablename__ = 'questions'
    __table_args__ = {'extend_existing': True}

    question_id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.service_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    question_text = db.Column(db.String(250))
    answer_text = db.Column(db.String(1000))

    def __init__(self, service_id, user_id, question_text):
        self.service_id = service_id
        self.user_id = user_id
        self.question_text = question_text
        self.answer_text = None

    def to_dict(self):
        return {
            'question_id': self.question_id,
            'user_id': self.user_id,
            'service_id': self.service_id,
            'question_text': self.question_text,
            'answer_text': self.answer_text
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(question_id=_id).first()
