from rest_framework import serializers

from pipeline.models.opportunity import Opportunity

class OpportunitySerializer(serializers.ModelSerializer):
    approval_status = serializers.ReadOnlyField(source='approval_status.status_name')

    class Meta:
        model = Opportunity
        fields = (
            "id",
            "address",
            "point",
            "approval_status"
        )    