"""
Services REST API, this module defines the following classes:
- `ServiceListApi`, service list API class
- `ServiceApi`, service API class
"""
from flask import request

import haversine as hs
from flask_jwt import jwt_required

from flask_restful import Resource, reqparse

from sorting_app.jwt import admin_rights_required
from sorting_app.models.service import Service


class ServiceListApi(Resource):
    @staticmethod
    def get():
        """
        :return: all services
        """
        services = Service.query.all()
        return [service.to_dict() for service in services], 200

    @jwt_required()
    @admin_rights_required()
    def post(self):
        """
        creates new service from JSON
        :return: new service
        """
        json_data = request.json
        # TODO validation
        new_service = Service(
            name=json_data.get('name', None),
            address=json_data.get('address', None),
            coordinates=json_data.get('coordinates', None),
            working_time=json_data.get('working_time', None),
            rating=json_data.get('rating', None),
            types_of_waste=json_data.get('types_of_waste', None),
            payment_condition=json_data.get('payment_condition', None),
            delivery_option=json_data.get('delivery_option', None),
            email=json_data.get('email', None),
            phone=json_data.get('phone', None),
            picture=json_data.get('picture', None),
        )
        try:
            new_service.save_to_db()
        except Exception as e:
            return {'message': f"Error in saving a service to database is: {e}"}, 400

        return new_service.to_dict(), 201


class ServiceApi(Resource):

    @staticmethod
    def get(service_id):
        """
        :return: one item from service table specified by service_id
        """
        service = Service.query.get_or_404(service_id)
        return service.to_dict()

    @jwt_required()
    @admin_rights_required()
    def put(self, service_id):
        """
        update service from JSON data
        :return: one updated service
        """
        service = Service.query.get_or_404(service_id)
        try:
            json_data = request.json
            for key in json_data:
                setattr(service, key, json_data.get(key))
        except Exception as e:
            return {'message': f"Error in retrieving a service data from JSOn is: {e}"}, 400
        try:
            service.save_to_db()
        except Exception as e:
            return {'message': f"Error in saving a service to database is: {e}"}, 400
        return service.to_dict(), 201


class ServiceApiNear(Resource):
    @staticmethod
    def post():
        """
        :return: all  services from service table near some point and with distance less than radius
        """
        parser = reqparse.RequestParser()
        parser.add_argument('latitude',
                            type=float,
                            required=True,
                            help="This field cannot be blank."
                            )
        parser.add_argument('longitude',
                            type=float,
                            required=True,
                            help="This field cannot be blank."
                            )
        parser.add_argument('radius',
                            type=float,
                            required=True,
                            help="This field cannot be blank."
                            )
        data = parser.parse_args()
        loc1 = (data['latitude'], data['longitude'])
        services = Service.query.all()
        services_near = []
        for service in services:
            if hs.haversine(loc1, service.coordinates) <= data['radius']:
                services_near.append(service)
        return [service.to_dict() for service in services_near], 200
