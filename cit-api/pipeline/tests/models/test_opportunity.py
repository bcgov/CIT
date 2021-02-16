from django.test import TestCase
from django.contrib.gis.geos import Point

from ...models import Opportunity, ApprovalStatus
 
class OpportunityModelTest(TestCase):
    def test_fields(self):
        approval_status = ApprovalStatus(status_name="Test status", 
                                        status_description="This is a test status",
                                        status_code="TEST",
                                        active_status=True)

        opportunity = Opportunity(1, "555 Testing Rd.", Point(110, -80, srid=4326), approval_status=approval_status)
        self.assertEqual(opportunity.id, 1)
        self.assertEqual(opportunity.address, "555 Testing Rd.")
        self.assertEqual(opportunity.point, Point(110, -80, srid=4326))
        self.assertEqual(opportunity.approval_status, approval_status)