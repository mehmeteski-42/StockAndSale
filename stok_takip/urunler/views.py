from rest_framework import viewsets
from .models import Urun
from .serializers import UrunSerializer

class UrunViewSet(viewsets.ModelViewSet):
    queryset = Urun.objects.all()
    serializer_class = UrunSerializer
