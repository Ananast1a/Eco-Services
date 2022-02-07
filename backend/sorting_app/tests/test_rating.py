import json

from . import TestEndpointsBase
from ..models.service import Service, Rating
from ..models.user import User
from . import app


class TestEndpoints(TestEndpointsBase):
    """
    class for recruiters api test cases
    """

    def test_get_ratings_all_success(self):
        # given
        with app.app_context():
            service_1 = Service(
                'OAK service',
                'Remeslennaya Street, 7, St. Petersburg, Russia, 197110',
                [59.96000898377962, 30.2681464833422406],
                'Monday-Friday   9 a.m - 5 p.m',
                5,
                ['plastic', 'metal', 'glass', 'paper'],
                True,
                False,
                'ecooak@eco.com',
                '+7 (812) 634-49-15',
                'https://st.depositphotos.com/1000940/2811/v/600/depositphotos_28113985-stock-illustration-'
                'vector-recycle-signs-and-symbols.jpg'
            )
            service_1.save_to_db()
        # when
        response = self.client.get('/api/v1/ratings/all')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(1, len(response.json))
        self.assertEqual(dict, type(response.json))
        self.assertEqual(200, response.status_code)

    def test_rating_by_rating_id_success(self):
        # given
        with app.app_context():
            service_1 = Service(
                'OAK service',
                'Remeslennaya Street, 7, St. Petersburg, Russia, 197110',
                [59.96000898377962, 30.2681464833422406],
                'Monday-Friday   9 a.m - 5 p.m',
                5,
                ['plastic', 'metal', 'glass', 'paper'],
                True,
                False,
                'ecooak@eco.com',
                '+7 (812) 634-49-15',
                'https://st.depositphotos.com/1000940/2811/v/600/depositphotos_28113985-stock-illustration-'
                'vector-recycle-signs-and-symbols.jpg'
            )
            service_1.save_to_db()
        # when
        response = self.client.get('/api/v1/ratings/1')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(1, len(response.json))
        self.assertEqual(dict, type(response.json))
        self.assertEqual(200, response.status_code)

    def test_get_ratings_failure(self):
        # when
        response = self.client.get('/api/v1/ratings')
        # then
        self.assertIn('message', response.json)
        self.assertIn('The method is not allowed for the requested URL.', response.json.values())
        self.assertEqual(405, response.status_code)

    def test_rating_all(self):

        with app.app_context():
            service_1 = Service(
                'OAK service',
                'Remeslennaya Street, 7, St. Petersburg, Russia, 197110',
                [59.96000898377962, 30.2681464833422406],
                'Monday-Friday   9 a.m - 5 p.m',
                4,
                ['plastic', 'metal', 'glass', 'paper'],
                True,
                False,
                'ecooak@eco.com',
                '+7 (812) 634-49-15',
                'https://st.depositphotos.com/1000940/2811/v/600/depositphotos_28113985-stock-illustration-'
                'vector-recycle-signs-and-symbols.jpg'
            )
            user1 = User('user', 'pass1', 'gg@gmail.com')
            user2 = User('user2', 'pass2', 'gg2@gmail.com')

            rating_1 = Rating(1, 1, 4)
            rating_2 = Rating(2, 1, 2)

            user1.save_to_db()
            user2.save_to_db()

            service_1.save_to_db()

            rating_1.save_to_db()
            rating_2.save_to_db()

        # when
        self.client.open('/api/v1/ratings/all')
        response = self.client.get('/api/v1/services/1')
        # then
        self.assertIn('OAK service', response.json.values())
        self.assertEqual(3.0, response.json['rating'])
