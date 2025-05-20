import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Anasayfa from "./pages/Anasayfa"; // Ana sayfa bileşenini ekliyoruz
import Urunler from "./pages/Urunler";
import UrunEkle from "./pages/UrunEkle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Anasayfa rotası */}
        <Route path="/" element={<Anasayfa />} />

        {/* Ürünler sayfası */}
        <Route path="/urunler" element={<Urunler />} />

        {/* Ürün Ekle sayfası */}
        <Route path="/ekle" element={<UrunEkle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
