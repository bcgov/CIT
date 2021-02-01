from django.test import TestCase
from django.contrib.gis.geos import Point
from django.urls import reverse
import json

from ...models import Investment

class InvestmentViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Investment.objects.create(address="555 Testing Rd.", point=Point(110, -80, srid=4326))

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get("/api/pipeline/investments/")
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse("investments"))
        self.assertEqual(response.status_code, 200)

    def test_lists_all_investments(self):
        response = self.client.get(reverse("investments"))
        response_content_dict = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response_content_dict["count"] == 1)

    def test_adds_investment_to_list(self):
        response = self.client.post(reverse("investments"), {"address": "1234 Testing Pl.", "point": "Point(70 -40)"})
        self.assertEqual(response.status_code, 201)
        
        response = self.client.get(reverse("investments"))
        response_content_dict = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response_content_dict["count"] == 2)
        self.assertTrue(response_content_dict["results"][1]["address"] == "1234 Testing Pl.")
