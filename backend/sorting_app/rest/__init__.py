from flask_restful import Api

from .question_api import QuestionApi, QuestionApiParam, QuestionServiceApiParam, QuestionUserApiParam
from .rating_api import RatingApi, RatingApiParam, RatingAllApi
from .service_api import ServiceListApi, ServiceApi, ServiceApiNear
from .secret_api import Secret
from .status_api import Status
from .user_register_api import UserRegister
from .waste_api import WasteApi, WasteApiParam
from .user_api import UserApi, UserApiParam

errors = {
    'JWTError': {
        'message': "You must be authenticated user to do this action",
        'status': 401,
    },
    'JWTErrorAdmin': {
        'message': "This operation can perform only user with admin rights",
        'status': 403,
    },
}

api = Api(prefix="/api/v1", errors=errors)

api.add_resource(UserRegister, '/register')
api.add_resource(Status, '/status')
api.add_resource(Secret, '/secret')
api.add_resource(ServiceListApi, '/services')
api.add_resource(ServiceApi, '/services/<int:service_id>')
api.add_resource(ServiceApiNear, '/services-near')
api.add_resource(WasteApi, '/wastes')
api.add_resource(WasteApiParam, '/wastes/<int:waste_id>')
api.add_resource(UserApi, '/users')
api.add_resource(UserApiParam, '/users/<int:user_id>')
api.add_resource(RatingApi, '/ratings')
api.add_resource(RatingApiParam, '/ratings/<int:service_id>')
api.add_resource(RatingAllApi, '/ratings/all')
api.add_resource(QuestionApi, '/questions')
api.add_resource(QuestionApiParam, '/questions/<int:question_id>')
api.add_resource(QuestionServiceApiParam, '/questions/service/<int:service_id>')
api.add_resource(QuestionUserApiParam, '/questions/user/<int:user_id>')
