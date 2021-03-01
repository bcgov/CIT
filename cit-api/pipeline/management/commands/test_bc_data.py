import bcdata
from django.core.management.base import BaseCommand

from pipeline.importers.databc_resource import import_wms_resource
from pipeline.importers.shp_resource import import_shp_resources
from pipeline.importers.csv_resource import import_csv_resources
from pipeline.models.general import DataSource, Road, Hex, ISP, Service

from pipeline.constants import BC_ALBERS_SRID

from pipeline.models.community import Community
from pipeline.models.general import (DataSource, LocationDistance, SchoolDistrict, Municipality,
                                     CivicLeader, Hex, Service, ISP)
from pipeline.models.location_assets import School, Hospital


class Command(BaseCommand):
    def handle(self, *args, **options):

        # for school in School.objects.all():
        #     print("school", school.point)
        #     school_district = SchoolDistrict.objects.get(geom__contains=school.point)
        #     print("school district", school_district)

        #     school.school_district = school_district
        #     school.save()

        #     # Note: using the Community point is better than checking for municipality area overlap because
        #     # most communities are unincorporated and thus do not have a linked municipality
        #     communities = Community.objects.filter(point__intersects=school_district.geom)
        #     school_district.community.set(communities)
        #     print("communities", communities)

        # ds = bcdata.get_data('school-districts-of-bc', as_gdf=True)
        wms_resources = DataSource.objects.get(name='school_districts')
        import_wms_resource(wms_resources)
