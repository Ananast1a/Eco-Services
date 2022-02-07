from flask import request
from flask_jwt import jwt_required
from flask_restful import Resource

from sorting_app.jwt import admin_rights_required

from sorting_app import db
from sorting_app.models.waste import Waste


class WasteApi(Resource):
    """
    API endpoints for methods without parameters for waste entity
    """

    @staticmethod
    def get():
        """
        :return: list of all items from waste table
        """
        wastes = Waste.query.all()
        return [waste.to_dict() for waste in wastes], 200

    @jwt_required()
    @admin_rights_required()
    def post(self):
        """
         accepts request with fields to
         :return: created waste
        """
        json_data = request.json
        # TODO validation
        new_waste = Waste(
            waste_type=json_data.get('waste_type', None),
            label=json_data.get('label', None),
            name=json_data.get('name', None),
            recyclability=json_data.get('recyclability', None),
            picture=json_data.get('picture', None),
            description=json_data.get('description', None),
            recommendations=json_data.get('recommendations', None)
        )
        db.session.add(new_waste)
        db.session.commit()
        return new_waste.to_dict(), 201


class WasteApiParam(Resource):
    """
    API endpoints which use parameters for waste entity
    """

    @staticmethod
    def get(waste_id):
        """
        :return: one item from waste table specified by waste_id
        """
        waste = Waste.query.get_or_404(waste_id)
        return waste.to_dict()
