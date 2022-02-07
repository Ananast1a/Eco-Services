
import unittest

from flask_restful.representations import json

from sorting_app import create_app
from sorting_app.db import db

app = create_app('TEST')


class TestEndpointsBase(unittest.TestCase):
    """
    base class for the test case
    """

    def setUp(self):
        """
        this method is executed before every test case
        :return:
        """
        with app.app_context():
            db.session.remove()
            db.create_all()
            self.client = app.test_client()

    def tearDown(self):
        """
        this method is executed after every test case
        :return:
        """
        # drop the tables
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def insert_data_in_db(self):
        """Adding necessary models in DB """
        self.client.post('/api/v1/register', headers={"Content-Type": "application/json"},
                         data=self.data_user1)

        self.data_user1 = json.dumps({
            "username": "vv6",
            "password": "qwer6",
            "email": "vv4@gmail.com"
        })
