from flask_restful import Resource


class Status(Resource):
    @staticmethod
    def get():
        return {
            "message": "White group API is working"
        }
