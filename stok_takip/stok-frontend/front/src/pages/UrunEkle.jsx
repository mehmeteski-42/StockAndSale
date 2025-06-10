import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UrunEkle.css";

const UrunEkle = () => {
  const [formData, setFormData] = useState({
    barkod: "",
    stok_kodu: "",
    urun_detayi: "",
    birim: "",
    miktar: "",
    alis_fiyati: "",
    satis_fiyati: "",
    ikincil_birim: "",
    birim_basi_miktar: "",
    ikincil_alis_fiyati: "",
    ikincil_satis_fiyati: "",
    kategori: "", // kategori id'si olacak
    image: null, // Ürün görseli
  });

  const [kategoriler, setKategoriler] = useState([]);
  const [yeniKategori, setYeniKategori] = useState("");
  const [yeniKategoriModu, setYeniKategoriModu] = useState(false);
  const [kategoriImage, setKategoriImage] = useState(null); // Kategori için görsel
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/kategoriler/")
      .then((res) => res.json())
      .then((data) => setKategoriler(data))
      .catch((err) => console.error("Kategori çekme hatası:", err));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image" || e.target.name === "kategoriImage") {
      // Görsel yüklerken state'i güncelle
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Yüklenen dosyayı al
      });
      if (e.target.name === "kategoriImage") {
        setKategoriImage(URL.createObjectURL(e.target.files[0])); // Kategori görseli için önizleme
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleKategoriEkle = async () => {
    if (!yeniKategori.trim()) return;

    const formDataKategori = new FormData();
    formDataKategori.append("ad", yeniKategori);
    if (kategoriImage) {
      formDataKategori.append("image", formData.image); // Kategori görselini ekliyoruz
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/kategoriler/", {
        method: "POST",
        body: formDataKategori, // Görsellerle birlikte kategori gönderiyoruz
      });

      if (!res.ok) {
        throw new Error("Kategori eklenemedi");
      }

      const yeni = await res.json();
      setKategoriler([...kategoriler, yeni]);
      setFormData({ ...formData, kategori: yeni.id }); // Yeni kategoriyi seç
      setYeniKategori("");
      setYeniKategoriModu(false);
    } catch (err) {
      alert("Kategori eklenemedi: " + err.message);
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      const cleanedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          if (value === "") return [key, null];
          return [key, value];
        })
      );

      // Ürün görseli ekleniyor
      const formDataUrun = new FormData();
      for (let key in cleanedData) {
        formDataUrun.append(key, cleanedData[key]);
      }
      if (formData.image) {
        formDataUrun.append("image", formData.image); // Ürün görseli
      }

      // Kategori seçili ise FormData'ya ekliyoruz
      if (formData.kategori) {
        formDataUrun.append("kategori", formData.kategori);  // Kategori ID'sini ekliyoruz
      }

      fetch("http://127.0.0.1:8000/api/urunler/", {
        method: "POST",
        body: formDataUrun, // Ürün görseli ve diğer veriler
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            console.error("Hata Detayı:", errorData);
            throw new Error(
              `Ürün eklenemedi:\n${JSON.stringify(errorData, null, 2)}`
            );
          }
          return res.json();
        })
        .then(() => {
          alert("Ürün başarıyla eklendi!");
          setFormData({
            barkod: "",
            stok_kodu: "",
            urun_detayi: "",
            birim: "",
            miktar: "",
            alis_fiyati: "",
            satis_fiyati: "",
            ikincil_birim: "",
            birim_basi_miktar: "",
            ikincil_alis_fiyati: "",
            ikincil_satis_fiyati: "",
            kategori: "", // Kategori sıfırlanıyor
            image: null, // Görseli sıfırlıyoruz
          });
          navigate("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    };


  return (
    <div className="urun-ekle-container">
      <h2>Yeni Ürün Ekle</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="barkod"
          placeholder="Barkod"
          value={formData.barkod}
          onChange={handleChange}
        />
        <br />
        <input
          name="stok_kodu"
          placeholder="Stok Kodu"
          value={formData.stok_kodu}
          onChange={handleChange}
        />
        <br />
        <input
          name="urun_detayi"
          placeholder="Ürün Detayı"
          value={formData.urun_detayi}
          onChange={handleChange}
        />
        <br />
        <input
          name="birim"
          placeholder="Birim"
          value={formData.birim}
          onChange={handleChange}
        />
        <br />
        <input
          name="miktar"
          type="number"
          placeholder="Miktar"
          value={formData.miktar}
          onChange={handleChange}
        />
        <br />
        <input
          name="alis_fiyati"
          type="number"
          placeholder="Alış Fiyatı"
          value={formData.alis_fiyati}
          onChange={handleChange}
        />
        <br />
        <input
          name="satis_fiyati"
          type="number"
          placeholder="Satış Fiyatı"
          value={formData.satis_fiyati}
          onChange={handleChange}
        />
        <br />
        <input
          name="ikincil_birim"
          placeholder="İkincil Birim"
          value={formData.ikincil_birim}
          onChange={handleChange}
        />
        <br />
        <input
          name="birim_basi_miktar"
          type="number"
          placeholder="Birim Başı Miktar"
          value={formData.birim_basi_miktar}
          onChange={handleChange}
        />
        <br />
        <input
          name="ikincil_alis_fiyati"
          type="number"
          placeholder="İkincil Alış Fiyatı"
          value={formData.ikincil_alis_fiyati}
          onChange={handleChange}
        />
        <br />
        <input
          name="ikincil_satis_fiyati"
          type="number"
          placeholder="İkincil Satış Fiyatı"
          value={formData.ikincil_satis_fiyati}
          onChange={handleChange}
        />
        <br />

        {/* Kategori Seçimi */}
        <label>Kategori:</label>
        <br />
        {!yeniKategoriModu ? (
          <>
            <select
              name="kategori"
              value={formData.kategori || ""}
              onChange={handleChange}
            >
              <option value="">Kategori seçin</option>
              {kategoriler.map((kat) => (
                <option key={kat.id} value={kat.id}>
                  {kat.ad}
                </option>
              ))}
            </select>

            <button type="button" onClick={() => setYeniKategoriModu(true)}>
              Yeni Kategori Ekle
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Yeni kategori adı"
              value={yeniKategori}
              onChange={(e) => setYeniKategori(e.target.value)}
            />
            <input
              type="file"
              name="kategoriImage"
              accept="image/*"
              onChange={handleChange}
            />
            {kategoriImage && (
              <img src={kategoriImage} alt="Kategori Görseli" width="100" />
            )}
            <button type="button" onClick={handleKategoriEkle}>
              Ekle
            </button>
            <button type="button" onClick={() => setYeniKategoriModu(false)}>
              Vazgeç
            </button>
          </>
        )}
        <br />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Ekle</button>
      </form>
      <br />
      <button onClick={() => navigate("/")}>Anasayfaya Dön</button>
    </div>
  );
};

export default UrunEkle;
