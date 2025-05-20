// src/pages/Anasayfa.jsx

import React, { useState, useEffect } from "react";

const Anasayfa = () => {
  const [kategoriler, setKategoriler] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/kategoriler/")
      .then((res) => res.json())
      .then((data) => setKategoriler(data))
      .catch((err) => console.error("Hata:", err));
  }, []);

  return (
    <div>
      <h1>Kategoriler</h1>
      <div className="kategori-container">
        {kategoriler.map((kategori) => (
          <div key={kategori.id} className="kategori-card">
            <img
              src={`http://127.0.0.1:8000${kategori.image}`}
              alt={kategori.ad}
              style={{ width: "100px", height: "100px" }}
            />
            <p>{kategori.ad}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Anasayfa;
