import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_AUTH_URL_RULE = '/api/v1/login'
    JWT_EXPIRATION_DELTA = timedelta(seconds=3600)


class ProductionConfig(Config):
    if os.environ.get('GAE_ENV') == 'standard':  # code in cloud database in cloud
        db_user = os.environ.get('CLOUD_SQL_USERNAME', '')
        db_password = os.environ.get('CLOUD_SQL_PASSWORD', '')
        db_name = os.environ.get('CLOUD_SQL_DATABASE_NAME', '')
        db_connection_name = os.environ.get('CLOUD_SQL_CONNECTION_NAME')
        SQLALCHEMY_DATABASE_URI = f'postgresql://{db_user}:{db_password}@/{db_name}?host=/cloudsql/{db_connection_name}'
    else:  # code local database in cloud
        SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI_PROD")


class DevelopmentConfig(Config):
    ENV = "development"  # be default production
    SECRET_KEY = "random string for security reason"
    DEBUG = True
    db_user = os.environ.get('LOCAL_SQL_USERNAME', '')
    db_password = os.environ.get('LOCAL_SQL_PASSWORD', '')
    db_name = os.environ.get('LOCAL_SQL_DATABASE_NAME_DEV', '')
    db_host = os.environ.get('LOCAL_SQL_DATABASE_HOST_DEV', '')
    db_port = os.environ.get('LOCAL_SQL_DATABASE_PORT_DEV', '')
    SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'


class TestingConfig(Config):
    TESTING = True
    db_user = os.environ.get('LOCAL_SQL_USERNAME', '')
    db_password = os.environ.get('LOCAL_SQL_PASSWORD', '')
    db_name = os.environ.get('LOCAL_SQL_DATABASE_NAME_TEST', '')
    db_host = os.environ.get('LOCAL_SQL_DATABASE_HOST_TEST', '')
    db_port = os.environ.get('LOCAL_SQL_DATABASE_PORT_TEST', '')
    SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'


app_configs = {
    'PROD': ProductionConfig,
    'DEV': DevelopmentConfig,
    'TEST': TestingConfig
}
