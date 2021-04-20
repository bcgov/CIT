import io
import csv
from django.http import HttpResponse

from rest_framework import views
from django.db import connection

from pipeline.models.opportunity import Opportunity
from pipeline.serializers.opportunity.get import OpportunityGetSerializer


class OpportunitiesListExport(views.APIView):
    """
    View to list multi opportunities from the DB
    """
    serializer_class = OpportunityGetSerializer

    def get(self, request, format='text/csv'):
        output = []
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="opportunities.csv"'
        writer = csv.writer(response, quoting=csv.QUOTE_NONNUMERIC)
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM cit_opportunities_vw WHERE approval_status_name='Published';")
            columns = [col[0] for col in cursor.description]
            writer.writerow(columns)
            for row in cursor.fetchall():
                output.append(row)
            writer.writerows(output)
        return response
