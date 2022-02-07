import traceback

import sqlalchemy
from flask import jsonify
from flask_jwt import JWTError

from sorting_app import app, jwt


#
# def base_error_handler(err):
#     """
#     Function that takes error and transforms it to json with message and traceback keys.
#     _traceback - get all information about error with number of line where error was found
#     """
#
#     _traceback = traceback.format_exc()
#     type_of_error = type(err).__name__
#     string_representation_of_error = f"{type_of_error} : {_traceback}"
#     return jsonify(message=str(err), traceback=string_representation_of_error), 400
#
#
# @app.errorhandler(sqlalchemy.exc.IntegrityError)
# def handle_database_errors(err: sqlalchemy.exc.IntegrityError):
#     """
#     Handler errors while adding Wrong data to Database
#     :param err: IntegrityError
#     :return: Tuple[Response, int]
#     """
#
#     return base_error_handler(err)
#
#
# @app.errorhandler(sqlalchemy.exc.DataError)
# def handle_database_errors_data_error(err: sqlalchemy.exc.DataError):
#     """
#     Handler errors while adding Wrong data to Database
#     :param err: DataError
#     :return: Tuple[Response, int]
#     """
#
#     return base_error_handler(err)
#
#
# @app.errorhandler(KeyError)
# def handle_key_errors(err: KeyError):
#     """
#     Handler KeyErrors (for example when can't find key in dict)
#     :param err: KeyError
#     :return: Tuple[Response, int]
#     """
#
#     return base_error_handler(err)
#
#
# @app.errorhandler(TypeError)
# def handle_type_errors(err: TypeError):
#     """
#     Handler TypeError (for example when can't find right header in request)
#     :param err: TypeError
#     :return: Tuple[Response, int]
#     """
#
#     return base_error_handler(err)
#
#
# @app.errorhandler(JWTError)
# def handle_jwt_error(err: JWTError):
#     """
#     Handler JWTError
#     :param err: JWTError
#     :return: Tuple[Response, int]
#     """
#     print('JWTError')
#
#     return base_error_handler(err)
#
#
# @app.errorhandler(Exception)
# def handle_base_error(err: BaseException):
#     """
#     Handler BaseException
#     :param err: BaseException
#     :return: Tuple[Response, int]
#     """
#
#     return base_error_handler(err)


print('handlers imported')
