from django.test import TestCase
from django.contrib.gis.geos import Point

from ...serializers.investment import InvestmentSerializer
from ...models import Investment

class InvestmentSerializerTest(TestCase):
    def test_contains_expected_fields(self):
        serializer = InvestmentSerializer()
        field_names = serializer.Meta.fields
        expected_fields = ['id', 'address', 'point']
        self.assertCountEqual(field_names, expected_fields)

    def test_field_content(self):
        investment = Investment(1, "555 Testing Rd.", Point(110, -80, srid=4326))
        serializer = InvestmentSerializer(instance=investment)
        self.assertEqual(investment.address, serializer['address'].value)
        self.assertEqual(investment.point, serializer['point'].value)



    
            