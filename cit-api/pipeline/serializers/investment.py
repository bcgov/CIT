from rest_framework import serializers

from pipeline.models.investment import Investment

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = (
            "id",
            "address",
            "point",
        )    