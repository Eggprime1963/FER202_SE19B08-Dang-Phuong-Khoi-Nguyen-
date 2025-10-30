import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* Basic Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Nested Routes for Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Index route - shows when path is exactly /dashboard */}
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
