import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd'
  };

  const linkStyle = {
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    color: '#333',
    transition: 'all 0.3s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#007bff',
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
        to="/san-pham"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        📦 Sản Phẩm
      </NavLink>
      
      <NavLink 
        to="/lien-he"
        style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
      >
        📞 Liên Hệ
      </NavLink>
    </nav>
  );
}

export default Navbar;