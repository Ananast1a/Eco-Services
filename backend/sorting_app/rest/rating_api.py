from flask_jwt import jwt_required, current_identity
from flask_restful import Resource, reqparse

from sorting_app.models.service import Rating, Service


class RatingApi(Resource):
    """
    API endpoints for methods without parameters for rating
    """

    @jwt_required()
    def post(self):
        """
        get json {"rating": 3, "service_id": 4} and save it in database
        :return: message
        """
        parser = reqparse.RequestParser()
        parser.add_argument('rating',
                            type=str,
                            required=True,
                            help="This field cannot be blank."
                            )
        parser.add_argument('service_id',
                            type=str,
                            required=True,
                            help="This field cannot be blank."
                            )

        user = current_identity
        data = parser.parse_args()
        Service.query.get_or_404(int(data['service_id']))
        rating = Rating.query.filter_by(user_id=user.id,
                                        service_id=int(data['service_id'])).first()
        if rating:
            return {'message': f"User {user.username} already give rating for "
                               f"service with id = {data['service_id']}"}, 400
        new_rating = Rating(user_id=user.id,
                            service_id=int(data['service_id']),
                            rating=int(data['rating'])
                            )
        new_rating.save_to_db()
        return {'message': "rating saved in db"}, 201


class RatingApiParam(Resource):
    """
    API endpoints which use parameters for user rating
    """

    @staticmethod
    def get(service_id):
        """
        :return: one rating from service table specified by service_id
        """
        Service.query.get_or_404(service_id)
        ratings = [rating.rating for rating in Rating.query.filter_by(service_id=service_id)]
        if not ratings:
            return {'rating': 0}
        return {'rating': f'{sum(ratings) / len(ratings):.0f}'}

    @jwt_required()
    def put(self, service_id):
        """
        get json {"rating": 3} and update rating for service from user
        :return: message
        """
        parser = reqparse.RequestParser()
        parser.add_argument('rating',
                            type=str,
                            required=True,
                            help="This field cannot be blank."
                            )
        user = current_identity
        data = parser.parse_args()
        Service.query.get_or_404(service_id)
        rating = Rating.query.filter_by(user_id=user.id,
                                        service_id=service_id).first()
        if rating:
            rating.rating = data['rating']
            rating.save_to_db()
            return {'message': f"Rating from user {user.username} for "
                               f"service with id = {service_id} was updated"}, 201
        # we think that all rating are equal zero, so we can update them
        new_rating = Rating(user_id=user.id,
                            service_id=service_id,
                            rating=int(data['rating'])
                            )
        new_rating.save_to_db()
        return {'message': "rating saved in db"}, 201


class RatingAllApi(Resource):
    """
    API endpoints for calculation of all ratings
    """

    @staticmethod
    def get():
        """
        recalculate ratings of all services
        :return: one item from service table specified by service_id
        """
        services = Service.query.all()
        for service in services:
            ratings = [rating.rating for rating in Rating.query.filter_by(service_id=service.service_id)]
            if ratings:
                service.rating = float(f'{sum(ratings) / len(ratings):.0f}')
            else:
                service.rating = 0.0
            service.save_to_db()
        return {'message': "All ratings were updated"}, 200
