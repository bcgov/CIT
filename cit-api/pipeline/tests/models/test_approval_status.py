from django.test import TestCase

from ...models import ApprovalStatus

class ApprovalStatusModelTest(TestCase):
    def test_fields(self):
        approval_status = ApprovalStatus(status_name="Test status", 
                                        status_description="This is a test status",
                                        status_code="TEST",
                                        active_status=True)
        self.assertEqual(approval_status.status_name, "Test status")
        self.assertEqual(approval_status.status_description, "This is a test status")
        self.assertEqual(approval_status.status_code, "TEST")
        self.assertEqual(approval_status.active_status, True)
        