from django.contrib import admin
from django.contrib.gis import forms
from django.contrib.gis.db.models import PointField

from .models import Location, Community


class LocationAdmin(admin.ModelAdmin):
    formfield_overrides = {
        PointField: {'widget': forms.OSMWidget(attrs={
            'display_raw': True})}
    }


class CommunityAdmin(admin.ModelAdmin):
    formfield_overrides = {
        PointField: {'widget': forms.OSMWidget(attrs={
            'display_raw': True})}
    }



admin.site.register(Location, LocationAdmin)
admin.site.register(Community, CommunityAdmin)
