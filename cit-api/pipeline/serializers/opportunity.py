from rest_framework import serializers

from pipeline.models.opportunity import Opportunity

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = (
            "id",
            "address",
            "point",
        )    