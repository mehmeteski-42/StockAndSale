import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Anasayfa from './pages/Anasayfa'; // Anasayfa sayfasını import ediyoruz
import Urunler from './pages/Urunler';
import UrunEkle from './pages/UrunEkle';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Anasayfa sayfası için '/' path'i kullanıyoruz */}
        <Route path="/" element={<Anasayfa />} />

        {/* Ürünler sayfası */}
        <Route path="/urunler" element={<Urunler />} />

        {/* Ürün ekleme sayfası */}
        <Route path="/ekle" element={<UrunEkle />} />
      </Routes>
    </Router>
  );
};

export default App;
