import { useState } from 'react';

function Navigation({ onChangePage }) {
  const [activePage, setActivePage] = useState('home');
  
  const handleNavClick = (page) => {
    setActivePage(page);
    onChangePage(page);
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#!">Movie Collection</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a 
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`} 
                href="#!" 
                onClick={() => handleNavClick('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activePage === 'awards' ? 'active' : ''}`} 
                href="#!" 
                onClick={() => handleNavClick('awards')}
              >
                Award Winners
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activePage === 'favorites' ? 'active' : ''}`} 
                href="#!" 
                onClick={() => handleNavClick('favorites')}
              >
                My Favorites 
                <span className="position-relative">
                  <i className="bi bi-heart-fill ms-1 text-danger"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;