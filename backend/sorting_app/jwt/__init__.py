from functools import wraps

from flask import jsonify
from flask_jwt import JWT, current_identity, JWTError

from .security import identity, authenticate

jwt = JWT(authentication_handler=authenticate, identity_handler=identity)


class JWTErrorAdmin(JWTError):

    def __init__(self,
                 error='Admin rules',
                 description='This operation can perform only user with admin rights',
                 status_code=403,
                 headers=None):
        self.error = error
        self.description = description
        self.status_code = status_code
        self.headers = headers


@jwt.auth_response_handler
def customized_response_handler(access_token, _identity):
    from sorting_app.models.user import User
    return jsonify({
        'access_token': access_token.decode('utf-8'),
        'user_id': _identity.id,
        'username': User.find_by_id(_identity.id).username,
        'email': User.find_by_id(_identity.id).email,
    })


@jwt.jwt_error_handler
def customized_error_handler(error):
    return jsonify({
        'message': error.description,
        'status_code': error.status_code,
    }), error.status_code


def admin_rights_required():
    """View decorator that requires user be admin a valid JWT token to be present in the request
    """

    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            user = current_identity
            if user.id != 1:
                raise JWTErrorAdmin()
            return fn(*args, **kwargs)

        return decorator

    return wrapper
