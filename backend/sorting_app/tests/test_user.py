import json

from . import TestEndpointsBase
from ..models.user import User
from . import app


class TestEndpoints(TestEndpointsBase):
    """
    class for recruiters api test cases
    """

    def test_get_users_empty_case_200(self):
        """
        checks whether the get response to api /users
        works correctly, returning empty list and the status code 200
        """
        # when
        response = self.client.get('/api/v1/users')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(list, type(response.json))
        self.assertEqual(0, len(response.json))
        self.assertEqual(200, response.status_code)

    def test_get_users_1_case_200(self):
        """
        checks whether the get request to api
        works correctly, returning list with length 1 the status code 200
        """
        # given
        self.data_user1 = json.dumps({
            "username": "vv",
            "password": "qwer",
            "email": "fg@gmail.com"
        })
        res = self.client.post('/api/v1/register', headers={"Content-Type": "application/json"},
                               data=self.data_user1)
        # when
        response = self.client.get('/api/v1/users')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(list, type(response.json))
        self.assertEqual(1, len(response.json))
        self.assertEqual(dict, type(response.json[0]))
        self.assertIn('email', response.json[0])
        self.assertEqual(200, response.status_code)

    def test_get_users_2_case_200(self):
        """
        checks whether the get request to api
        works correctly, returning list with length 2 the status code 200
        """
        # given
        with app.app_context():
            user1 = User('user', 'pass1', 'gg@gmail.com')
            user2 = User('user2', 'pass2', 'gg2@gmail.com')
            user1.save_to_db()
            user2.save_to_db()
        # when
        response = self.client.get('/api/v1/users')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(list, type(response.json))
        self.assertEqual(2, len(response.json))
        self.assertEqual(dict, type(response.json[0]))
        self.assertIn('email', response.json[0])
        self.assertIn('user2', response.json[1].values())
        self.assertEqual(200, response.status_code)

    def test_get_user_1_case_200(self):
        """
        checks whether the get request to api
        works correctly, returning dict for user the status code 200
        """
        # given
        self.data_user1 = json.dumps({
            "username": "vv",
            "password": "qwer",
            "email": "fg@gmail.com"
        })
        res = self.client.post('/api/v1/register', headers={"Content-Type": "application/json"},
                               data=self.data_user1)
        # when
        response = self.client.get('/api/v1/users/1')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(dict, type(response.json))
        self.assertIn('email', response.json)
        self.assertEqual(200, response.status_code)