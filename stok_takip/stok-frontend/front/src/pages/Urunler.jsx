import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Urunler.css";

const Urunler = () => {
  const [urunler, setUrunler] = useState([]);
  const [aktifIslem, setAktifIslem] = useState(null);
  const [barkod, setBarkod] = useState("");

  // Hesaplama Fonksiyonları
  const hesaplaBirimBasiKar = (alis, satis) => satis - alis;
  const hesaplaIkincilBirimBasiKar = (a, s) => (a && s ? s - a : null);
  const hesaplaBirincilToplamKar = (kar, miktar) => kar * miktar;
  const hesaplaIkincilToplamKar = (kar, birimMiktar, miktar) =>
    kar && birimMiktar ? kar * birimMiktar * miktar : null;

  const fetchUrunler = () => {
    fetch("http://127.0.0.1:8000/api/urunler/")
      .then((res) => res.json())
      .then((data) => {
        const urunlerWithCalc = data.map((urun) => {
          const birimBasiKar = hesaplaBirimBasiKar(urun.alis_fiyati, urun.satis_fiyati);
          const ikincilBirimBasiKar = hesaplaIkincilBirimBasiKar(
            urun.ikincil_alis_fiyati,
            urun.ikincil_satis_fiyati
          );
          const birincilToplamKar = hesaplaBirincilToplamKar(birimBasiKar, urun.miktar);
          const ikincilToplamKar = hesaplaIkincilToplamKar(
            ikincilBirimBasiKar,
            urun.birim_basi_miktar,
            urun.miktar
          );

          return {
            ...urun,
            birimBasiKar,
            ikincilBirimBasiKar,
            birincilToplamKar,
            ikincilToplamKar,
          };
        });
        setUrunler(urunlerWithCalc);
      });
  };

  useEffect(() => {
    fetchUrunler();
  }, []);

  const barkodIsle = async () => {
    if (!barkod || !aktifIslem) return;

    const urun = urunler.find((u) => u.barkod === barkod);
    if (!urun) {
      alert("Ürün bulunamadı!");
      return;
    }

    let yeniMiktar = urun.miktar;

    if (aktifIslem === "ekle") yeniMiktar += 1;
    if (aktifIslem === "dus") yeniMiktar -= 1;

    if (aktifIslem === "guncelle") {
      alert(`Güncellemek için yönlendiriliyorsun: ${urun.barkod}`);
      // yönlendirme eklenebilir
      return;
    }

    // PATCH işlemi
    await fetch(`http://127.0.0.1:8000/api/urunler/${urun.idurunler}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ miktar: yeniMiktar }),
    });

    setAktifIslem(null);
    setBarkod("");
    fetchUrunler();
  };

  return (
    <div className="urunler-container">
      <h2 className="page-title">Ürün Listesi</h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/ekle">
          <button className="add-product-btn">Yeni Ürün Ekle</button>
        </Link>
        <button onClick={() => setAktifIslem("ekle")} className="action-btn">Hızlı Ekle</button>
        <button onClick={() => setAktifIslem("dus")} className="action-btn">Hızlı Düş</button>
        <button onClick={() => setAktifIslem("guncelle")} className="action-btn">Ürün Güncelle</button>
      </div>

      {aktifIslem && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p><b>Barkodu okutun ({aktifIslem})</b></p>
          <input
            autoFocus
            value={barkod}
            onChange={(e) => setBarkod(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && barkodIsle()}
            placeholder="Barkod okutun"
            style={{ padding: "10px", fontSize: "1rem", width: "300px" }}
          />
        </div>
      )}

      <table className="urunler-table">
        <thead>
          <tr>
            <th>Barkod</th>
            <th>Stok Kodu</th>
            <th>Ürün Detayı</th>
            <th>Birim</th>
            <th>Miktar</th>
            <th>Alış Fiyatı</th>
            <th>Satış Fiyatı</th>
            <th>İkincil Birim</th>
            <th>Birim Başı Miktar</th>
            <th>İkincil Alış Fiyatı</th>
            <th>İkincil Satış Fiyatı</th>
            <th>Birim Başına Kar</th>
            <th>İkincil Birim Başına Kar</th>
            <th>Birinçli Toplam Kar</th>
            <th>İkincil Toplam Kar</th>
          </tr>
        </thead>
        <tbody>
          {urunler.map((urun) => (
            <tr key={urun.idurunler}>
              <td>{urun.barkod}</td>
              <td>{urun.stok_kodu}</td>
              <td>{urun.urun_detayi}</td>
              <td>{urun.birim}</td>
              <td>{urun.miktar}</td>
              <td>{urun.alis_fiyati}</td>
              <td>{urun.satis_fiyati}</td>
              <td>{urun.ikincil_birim}</td>
              <td>{urun.birim_basi_miktar}</td>
              <td>{urun.ikincil_alis_fiyati}</td>
              <td>{urun.ikincil_satis_fiyati}</td>
              <td>{urun.birimBasiKar}</td>
              <td>{urun.ikincilBirimBasiKar}</td>
              <td>{urun.birincilToplamKar}</td>
              <td>{urun.ikincilToplamKar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Urunler;
