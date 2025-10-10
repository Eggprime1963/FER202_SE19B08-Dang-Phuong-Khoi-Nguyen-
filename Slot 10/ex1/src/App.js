import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FooterPage from './pages/FooterPage';

// Import components
import NavBar from './components/Navigation/NavBar';
import AccountModal from './components/Account/AccountModal';

function App() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  
  const handleAccountModalOpen = () => setShowAccountModal(true);
  const handleAccountModalClose = () => setShowAccountModal(false);
  
  return (
    <Router>
      <div className="App">
        <NavBar onAccountClick={handleAccountModalOpen} />
        
        {/* Account Modal */}
        <AccountModal 
          show={showAccountModal} 
          onClose={handleAccountModalClose} 
        />
        
        <Routes>
          <Route path="/" element={
            <div className="container py-4">
              <HomePage />
              <hr className="my-5" />
              <MoviePage />
            </div>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <FooterPage />
      </div>
    </Router>
  );
}
export default App;
