from django.test import TestCase
from django.contrib.gis.geos import Point

from ...serializers.opportunity.edit import OpportunitySerializer
from ...models import Opportunity

class OpportunitySerializerTest(TestCase):
    def test_contains_expected_fields(self):
        serializer = OpportunitySerializer()
        field_names = serializer.Meta.fields
        expected_fields = ['id', 'address', 'point', 'approval_status', 'date_created', 'date_updated']
        self.assertCountEqual(field_names, expected_fields)

    def test_field_content(self):
        opportunity = Opportunity(1, "555 Testing Rd.", Point(110, -80, srid=4326))
        serializer = OpportunitySerializer(instance=opportunity)
        self.assertEqual(opportunity.address, serializer['address'].value)
        self.assertEqual(opportunity.point, serializer['point'].value)



    
            