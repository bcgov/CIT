from django.core.management.base import BaseCommand

from pipeline.importers.data_sources import import_data_sources
from pipeline.models.bc_assessment.bc_assessment_regional_district import BCAssessmentRegionalDistrict


class Command(BaseCommand):
    def handle(self, *args, **options):

        import_data_sources()
