from rest_framework import serializers
from .models import Urun, Kategori
class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = ['id', 'ad', 'image']
class UrunSerializer(serializers.ModelSerializer):
    kategori = kategori = serializers.PrimaryKeyRelatedField(queryset=Kategori.objects.all())
    class Meta:
        model = Urun
        fields = ['id', 'barkod', 'stok_kodu', 'urun_detayi', 'birim', 'miktar', 'alis_fiyati', 'satis_fiyati', 'image', 'kategori']
