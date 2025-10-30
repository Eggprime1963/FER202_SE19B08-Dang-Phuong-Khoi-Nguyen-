import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#2c3e50',
    borderBottom: '1px solid #34495e'
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    color: '#ecf0f1',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#3498db',
    color: 'white'
  };

  return (
    <nav style={navStyle}>
      <NavLink 
        to="/" 
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        🏠 Trang Chủ
      </NavLink>
      
      <NavLink 
        to="/about"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        ℹ️ Giới Thiệu
      </NavLink>
      
      <NavLink 
        to="/dashboard"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        📊 Dashboard
      </NavLink>
    </nav>
  );
}

export default Navbar;