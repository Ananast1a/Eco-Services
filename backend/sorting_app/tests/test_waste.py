import json

from . import TestEndpointsBase
from ..models.waste import Waste
from . import app


class TestEndpoints(TestEndpointsBase):
    """
    class for recruiters api test cases
    """

    def test_get_wastes_empty_case_200(self):
        """
        checks whether the get response to api /services
        works correctly, returning empty list and the status code 200
        """
        # when
        response = self.client.get('/api/v1/wastes')
        # then
        self.assertIn('application/json', str(response.headers.get('Content-Type')))
        self.assertEqual(list, type(response.json))
        self.assertEqual(0, len(response.json))
        self.assertEqual(200, response.status_code)

    def test_get_wastes_success(self):
        # given
        with app.app_context():
            waste_1 = Waste(
                'Plastic',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Plastic-recyc-01.svg/120px-Plastic-recyc-01.svg.png'
                '01 PET (PETF) - polyethylene terephthalate',
                'yes',
                'https://www.agvu.de/wp-content/uploads/2016/09/PET.jpg',
                '1) Bottles with a convex point at the bottom',
                'In order to hand over plastic products.'
            )
            waste_1.save_to_db()
        # when
        response = self.client.get('/api/v1/wastes')
        # then
        self.assertEqual(1, len(response.json))
        self.assertEqual(dict, type(response.json[0]))
        self.assertIn('waste_type', response.json[0])
        self.assertIn('Plastic', response.json[0].values())
        self.assertEqual(200, response.status_code)

    def test_get_waste_by_id_success(self):
        # given
        with app.app_context():
            waste_1 = Waste(
                'Plastic',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Plastic-recyc-01.svg/120px-Plastic-recyc-01.svg.png'
                '01 PET (PETF) - polyethylene terephthalate',
                'yes',
                'https://www.agvu.de/wp-content/uploads/2016/09/PET.jpg',
                '1) Bottles with a convex point at the bottom',
                'In order to hand over plastic products.'
            )
            waste_2 = Waste(
                'Plastic',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Plastic-recyc-02.svg/120px-Plastic-recyc-02.svg.png'
                '02 HDPE (PEND) - high density polyethylene (low pressure)',
                'yes',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrGdqGvJePa-_Z4X-3BaB17wGadpEk-TlMGTwM5Gl0khfF3ARzCIw'
                '-3NjNIw-Gv5kT78&usqp=CAU',

                '1) There is a characteristic "seam" on the bottom',

                'In order to hand over plastic products'
            )
            waste_1.save_to_db()
            waste_2.save_to_db()
        # when
        response = self.client.get('/api/v1/wastes/2')
        # then
        self.assertIn('In order to hand over plastic products', response.json.values())
        self.assertEqual(dict, type(response.json))
        self.assertEqual(200, response.status_code)


