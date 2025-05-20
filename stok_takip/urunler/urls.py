# urunler/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UrunViewSet, HizliEkleAPIView, HizliDusAPIView, GuncelleBarkodlaAPIView, KategoriViewSet

router = DefaultRouter()
router.register(r'urunler', UrunViewSet)  # UrunViewSet'i 'urunler' endpointi ile ilişkilendiriyoruz
router.register(r'kategoriler', KategoriViewSet)

urlpatterns = [
    path('', include(router.urls)),  # URL'leri dahil ediyoruz
    path('urunler/hizli_ekle/', HizliEkleAPIView.as_view(), name='hizli-ekle'),
    path('urunler/hizli_dus/', HizliDusAPIView.as_view(), name='hizli-dus'),
    path('urunler/guncelle_barkodla/', GuncelleBarkodlaAPIView.as_view(), name='barkodla-guncelle'),
]
