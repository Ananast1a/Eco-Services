from werkzeug.security import check_password_hash

from sorting_app.models.user import User


def authenticate(username, password):
    user = User.find_by_username(username)
    if user and check_password_hash(user.password, password):
        return user


def identity(payload):
    user_id = payload['identity']
    return User.find_by_id(user_id)
