import React from 'react';
import './App.css';

// Import components
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* Bài tập 1: Routes cơ bản */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
          
          {/* Bài tập 2: Dynamic Route với tham số */}
          <Route path="/san-pham/:productId" element={<ProductDetail />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
