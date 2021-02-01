from django.test import TestCase
from django.contrib.gis.geos import Point

from ...models import Investment
 
class InvestmentModelTest(TestCase):
    def test_fields(self):
        investment = Investment(1, "555 Testing Rd.", Point(110, -80, srid=4326))
        self.assertEqual(investment.id, 1)
        self.assertEqual(investment.address, "555 Testing Rd.")
        self.assertEqual(investment.point, Point(110, -80, srid=4326))