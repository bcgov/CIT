import bcdata
from django.core.management.base import BaseCommand

from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.models.general import DataSource, Road, Hex, ISP, Service


class Command(BaseCommand):
    def handle(self, *args, **options):
        # print("Importing CensusSubdivisions...")
        # import_shp_resources("census")

        # print("Importing Roads...")
        # import_shp_resources("roads")

        # print("Importing connectivity Hexes...")
        # import_shp_resources("hexes")

        # print("Importing Communities...")
        # import_csv_resources("communities")

        wms_resources = DataSource.objects.filter(source_type="WMS").order_by('import_order')
        for resource in wms_resources:
            import_wms_resource(resource)
