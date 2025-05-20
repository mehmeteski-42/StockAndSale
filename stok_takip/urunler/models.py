from django.db import models

class Kategori(models.Model):
    ad = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='kategori_resimleri/', null=True, blank=True)

    def __str__(self):
        return self.ad

class Urun(models.Model):
    image = models.ImageField(upload_to='urun_resimleri/', null=True, blank=True)
    id = models.AutoField(primary_key=True)
    barkod = models.CharField(max_length=45)
    stok_kodu = models.CharField(max_length=45, null=True, blank=True)
    urun_detayi = models.CharField(max_length=45)
    birim = models.CharField(max_length=45)
    miktar = models.IntegerField()
    alis_fiyati = models.DecimalField(max_digits=10, decimal_places=2)
    satis_fiyati = models.DecimalField(max_digits=10, decimal_places=2)
    ikincil_birim = models.CharField(max_length=45, null=True, blank=True)
    birim_basi_miktar = models.IntegerField(null=True, blank=True)
    ikincil_alis_fiyati = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    ikincil_satis_fiyati = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Yeni kategori ilişkisi
    kategori = models.ForeignKey(Kategori, on_delete=models.SET_NULL, null=True, blank=True)

    @property
    def birim_basi_kar(self):
        return self.satis_fiyati - self.alis_fiyati

    @property
    def ikincil_birim_basi_kar(self):
        if self.ikincil_alis_fiyati is not None and self.ikincil_satis_fiyati is not None:
            return self.ikincil_satis_fiyati - self.ikincil_alis_fiyati
        return None

    @property
    def birincil_toplam_kar(self):
        return self.birim_basi_kar * self.miktar

    @property
    def ikincil_toplam_kar(self):
        if self.ikincil_birim_basi_kar is not None and self.birim_basi_miktar is not None:
            return self.ikincil_birim_basi_kar * self.birim_basi_miktar * self.miktar
        return None

    def __str__(self):
        return f"{self.urun_detayi} ({self.barkod})"
