import os
from rest_framework.viewsets import ViewSet
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from pipeline.serializers.file_upload import FileUpload
from pipeline.models.bc_assessment.bc_assessment_census_subdivision import BCAssessmentCensusSubdivision
from pipeline.models.bc_assessment.bc_assessment_economic_region import BCAssessmentEconomicRegion
from pipeline.models.bc_assessment.bc_assessment_regional_district import BCAssessmentRegionalDistrict
from pipeline.importers.utils import *

UPLOAD_DIR = settings.MEDIA_ROOT

class FileUploadViewSet(ViewSet):
    def create(self, request):
        serializer_class = FileUpload(data=request.data)
       
        if 'file' not in request.FILES or not serializer_class.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            files = request.FILES.getlist('file')
            for f in files:
                handle_uploaded_file(f)

            return Response(status=status.HTTP_201_CREATED)

def handle_uploaded_file(f):
    filename = f.name
    filepath = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    with open(filepath, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    import_bc_assessment(filepath)

def import_bc_assessment(filepath):
    if 'bca_summary_by_cd_use.csv' in filepath:
        data = pd.read_csv(filepath)
        data.columns= data.columns.str.lower()
        write_to_db(BCAssessmentRegionalDistrict, data)
    elif 'bca_summary_by_csd_use.csv' in filepath:
        data = pd.read_csv(filepath)
        data.columns= data.columns.str.lower()
        write_to_db(BCAssessmentCensusSubdivision, data)
    elif 'bca_summary_by_er_use.csv' in filepath:
        data = pd.read_csv(filepath)
        data.columns= data.columns.str.lower()
        write_to_db(BCAssessmentEconomicRegion, data)