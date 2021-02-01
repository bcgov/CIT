from rest_framework import generics

from pipeline.models.investment import Investment
from pipeline.serializers.investment import InvestmentSerializer

class InvestmentsList(generics.ListCreateAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer