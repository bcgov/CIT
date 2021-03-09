from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core import serializers

from pipeline.models.opportunity import ApprovalStatus
from pipeline.models.general import RegionalDistrict

class OptionsView(APIView):
    def get(self, request, format=None):
        """
        Return a list of all options.
        """
        statuses = ApprovalStatus.objects.all().values()
        regional_districts = RegionalDistrict.objects.all().values('id', 'area_id', 'name')
        return Response(dict(
            statuses=statuses,
            regionalDistricts=regional_districts))
