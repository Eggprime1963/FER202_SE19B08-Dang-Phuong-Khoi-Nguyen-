import { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ onAccountClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    // Implement quick search functionality
    console.log("Quick search for:", searchTerm);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-film me-2"></i>
          Movie Collection
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          
          {/* Quick Search Form */}
          <form className="d-flex me-3" onSubmit={handleQuickSearch}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Quick search" 
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          
          {/* Icons */}
          <div className="d-flex align-items-center">
            {/* Account Dropdown */}
            <div className="dropdown me-3">
              <a 
                className="nav-icon dropdown-toggle" 
                href="#!" 
                id="accountDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li><button className="dropdown-item" onClick={() => onAccountClick('profile')}>Manage Your Profiles</button></li>
                <li><button className="dropdown-item" onClick={() => onAccountClick()}>Build Your Account</button></li>
                <li><button className="dropdown-item" onClick={() => onAccountClick('password')}>Change Password</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item">Sign Out</button></li>
              </ul>
            </div>
            
            {/* Login Icon */}
            <Link className="nav-icon me-3" to="/login">
              <i className="bi bi-box-arrow-in-right"></i>
            </Link>
            
            {/* Favorites Icon */}
            <Link 
              className="nav-icon position-relative" 
              to="/favorites"
            >
              <i className="bi bi-heart-fill"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                4
                <span className="visually-hidden">favorite items</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;