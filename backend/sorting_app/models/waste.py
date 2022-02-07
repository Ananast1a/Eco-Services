"""
Waste model used to storing information about types of waste, this module defines the
following classes:
- `Waste`, waste model
"""
from sorting_app.db import db


class Waste(db.Model):
    __tablename__ = 'wastes'
    __table_args__ = {'extend_existing': True}

    waste_id = db.Column(db.Integer, primary_key=True)
    waste_type = db.Column(db.String(70))
    label = db.Column(db.String(400))
    name = db.Column(db.String(150))
    recyclability = db.Column(db.String(200))
    picture = db.Column(db.String(400))
    description = db.Column(db.Text)
    recommendations = db.Column(db.Text)

    def __init__(self, waste_type=None, label=None, name=None, recyclability=None, picture=None, description=None,
                 recommendations=None):
        self.waste_type = waste_type
        self.label = label
        self.name = name
        self.recyclability = recyclability
        self.picture = picture
        self.description = description
        self.recommendations = recommendations

    def __repr__(self):
        return '<Waste %r>' % self.name

    def to_dict(self):
        return {
            "waste_id": self.waste_id,
            "label": self.label,
            "waste_type": self.waste_type,
            "name": self.name,
            "recyclability": self.recyclability,
            "picture": self.picture,
            "description": self.description,
            "recommendations": self.recommendations
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
