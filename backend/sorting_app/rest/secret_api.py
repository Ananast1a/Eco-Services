from flask_restful import Resource
from flask_jwt import jwt_required, current_identity


class Secret(Resource):
    @jwt_required()
    def get(self):
        user = current_identity
        return {
            "message": "This can view only authenticated users",
            "user name": user.username,
            "user id": user.id
        }
