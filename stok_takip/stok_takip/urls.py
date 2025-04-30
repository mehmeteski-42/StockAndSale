from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from urunler.views import UrunViewSet

router = routers.DefaultRouter()
router.register(r'urunler', UrunViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
