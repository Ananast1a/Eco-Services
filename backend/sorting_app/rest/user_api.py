from flask_restful import Resource

from sorting_app.models.user import User


class UserApi(Resource):
    """
    API endpoints for methods without parameters for user entity
    """

    @staticmethod
    def get():
        """
        :return: list of all items from user table
        """
        users = User.query.all()
        return [user.to_dict() for user in users], 200


class UserApiParam(Resource):
    """
    API endpoints which use parameters for user entity
    """

    @staticmethod
    def get(user_id):
        """
        :return: one item from waste table specified by waste_id
        """
        user = User.query.get_or_404(user_id)
        return user.to_dict()
