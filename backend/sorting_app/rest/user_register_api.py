from flask_restful import Resource, reqparse
from sorting_app.models.user import User


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('email',
                        type=str,
                        required=True,
                        help="This email field cannot be blank."
                        )

    @staticmethod
    def post():
        data = UserRegister.parser.parse_args()

        if User.find_by_username(data['username']):
            return {"message": "A user with that username already exists"}, 400

        if User.find_by_email(data['email']):
            return {"message": "A user with that email already exists"}, 400

        user = User(data['username'], data['password'], data['email'])
        user.save_to_db()

        return {"message": "User created successfully."}, 201
