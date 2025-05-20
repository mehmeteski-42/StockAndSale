# urunler/views.py

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Urun, Kategori
from .serializers import UrunSerializer, KategoriSerializer
class UrunViewSet(viewsets.ModelViewSet):
    queryset = Urun.objects.all()  # Urunler modeline ait tüm verileri alıyoruz
    serializer_class = UrunSerializer  # UrunlerSerializer sınıfını kullanıyoruz

class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class HizliEkleAPIView(APIView):
    def post(self, request):
        barkod = request.data.get("barkod")
        try:
            urun = Urun.objects.get(barkod=barkod)
            urun.miktar += 1
            urun.save()
            return Response(UrunSerializer(urun).data)
        except Urun.DoesNotExist:
            return Response({"error": "Ürün bulunamadı"}, status=status.HTTP_404_NOT_FOUND)

class HizliDusAPIView(APIView):
    def post(self, request):
        barkod = request.data.get("barkod")
        try:
            urun = Urun.objects.get(barkod=barkod)
            if urun.miktar > 0:
                urun.miktar -= 1
                urun.save()
            return Response(UrunSerializer(urun).data)
        except Urun.DoesNotExist:
            return Response({"error": "Ürün bulunamadı"}, status=status.HTTP_404_NOT_FOUND)

class GuncelleBarkodlaAPIView(APIView):
    def post(self, request):
        barkod = request.data.get("barkod")
        try:
            urun = Urun.objects.get(barkod=barkod)
            serializer = UrunSerializer(urun, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Urun.DoesNotExist:
            return Response({"error": "Ürün bulunamadı"}, status=status.HTTP_404_NOT_FOUND)