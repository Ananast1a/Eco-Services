import json

from . import TestEndpointsBase
from ..models.service import Service
from . import app


class TestEndpoints(TestEndpointsBase):
    """
    class for recruiters api test cases
    """

    def test_get_services_empty_case_200(self):
        """
        checks whether the get response to api /services
        works correctly, returning empty list and the status code 200
        """
        # when
        response = self.client.get('/api/v1/services')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(list, type(response.json))
        self.assertEqual(0, len(response.json))
        self.assertEqual(200, response.status_code)

    def test_get_services_success(self):
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
        response = self.client.get('/api/v1/services')
        # then
        self.assertEqual(1, len(response.json))
        self.assertEqual(dict, type(response.json[0]))
        self.assertIn('name', response.json[0])
        self.assertIn('OAK service', response.json[0].values())
        self.assertEqual(200, response.status_code)

    def test_get_service_success(self):
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
            service_2 = Service(
                'Poplar service',
                'Vyborg Avenue, 212, с11, St. Petersburg, Russia, 194362',
                [60.07061980027474, 30.287834531223186],
                'Monday-Friday   9 a.m - 5 p.m',
                5,
                ['plastic', 'metal', 'glass', 'paper'],
                True,
                False,
                'ecopoplar@eco.com',
                '+7 (812) 634-49-15',
                'https://gidpomusoru.ru/wp-content/uploads/2021/02/biodegradable-arrows-vector-icons-set.jpg'
            )
            service_1.save_to_db()
            service_2.save_to_db()
        # when
        response = self.client.get('/api/v1/services/1')
        # then
        self.assertIn('OAK service', response.json.values())
        self.assertEqual(dict, type(response.json))
        self.assertEqual(200, response.status_code)


