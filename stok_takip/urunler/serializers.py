from rest_framework import serializers
from .models import Urun

class UrunSerializer(serializers.ModelSerializer):
    class Meta:
        model = Urun
        fields = '__all__'
