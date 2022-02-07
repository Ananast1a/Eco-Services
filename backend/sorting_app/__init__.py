from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_swagger_ui import get_swaggerui_blueprint

from .config import app_configs
from .db import db
from .rest import api
from .jwt import jwt

migrate = Migrate()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(app_configs[config_name])
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    jwt.init_app(app)
    _register_blueprints(app)
    CORS(app)
    return app


SWAGGER_URL = '/api/v1/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/openapi.yaml'  # Our API url (can of course be a local resource)

# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "White team Eco"
    },
    # oauth_config={  # OAuth config. See https://github.com/swagger-api/swagger-ui#oauth2-configuration .
    #    'clientId': "your-client-id",
    #    'clientSecret': "your-client-secret-if-required",
    #    'realm': "your-realms",
    #    'appName': "your-app-name",
    #    'scopeSeparator': " ",
    #    'additionalQueryStringParams': {'test': "hello"}
    # }
)


def _register_blueprints(app):
    app.register_blueprint(swaggerui_blueprint)
