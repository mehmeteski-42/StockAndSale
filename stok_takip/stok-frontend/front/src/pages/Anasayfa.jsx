import React, { useEffect, useState } from "react";
import "./Anasayfa.css";

const Anasayfa = () => {
  const [kategoriler, setKategoriler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [secilenKategoriId, setSecilenKategoriId] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/kategoriler/")
      .then((res) => res.json())
      .then((data) => setKategoriler(data))
      .catch((err) => console.error("Kategori Hatası:", err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/urunler/")
      .then((res) => res.json())
      .then((data) => setUrunler(data))
      .catch((err) => console.error("Ürün Hatası:", err));
  }, []);

  const filtrelenmisUrunler = secilenKategoriId
    ? urunler.filter((urun) => urun.kategori === secilenKategoriId)
    : [];

  return (
    <div className="anasayfa-container">
      <h1>Kategoriler</h1>
      <div className="kategoriler-container">
        {kategoriler.map((kategori) => (
          <div
            key={kategori.id}
            onClick={() => setSecilenKategoriId(kategori.id)}
            className="kategori-kutu"
          >
            <img
              src={`http://127.0.0.1:8000${kategori.image}`}
              alt={kategori.ad}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <p>{kategori.ad}</p>
          </div>
        ))}
      </div>

      {secilenKategoriId && (
        <div className="urunler-container">
          <h2>Ürünler</h2>
          <div className="urun-kutular">
            {filtrelenmisUrunler.map((urun) => (
              <div key={urun.id} className="urun-kutu">
                <img
                  src={`http://127.0.0.1:8000${urun.image}`}
                  alt={urun.urun_detayi}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <p><b>{urun.urun_detayi}</b></p>
                <p>Barkod: {urun.barkod}</p>
                <p>Stok Kodu: {urun.stok_kodu}</p>
                <p>Alış: {urun.alis_fiyati}₺ | Satış: {urun.satis_fiyati}₺</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Anasayfa;
