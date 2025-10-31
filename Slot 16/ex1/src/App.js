import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuthState } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import Login from './components/Login';
import Header from './components/Header';
import MovieManager from './components/MovieManager';
import WelcomeModal from './components/WelcomeModal';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthState();
  return user ? children : <Navigate to="/login" replace />;
};

// Main App Layout component
const AppLayout = () => {
  const { user } = useAuthState();
  const [showWelcome, setShowWelcome] = React.useState(false);

  // Show welcome modal on first login
  React.useEffect(() => {
    if (user) {
      // Check if this is the first time visiting
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setShowWelcome(true);
        localStorage.setItem('hasSeenWelcome', 'true');
      }
    }
  }, [user]);

  if (!user) {
    return <Login />;
  }

  const handleWelcomeClose = () => {
    setShowWelcome(false);
  };

  return (
    <MovieProvider>
      <div className="App">
        <Header />
        <main>
          <MovieManager />
        </main>
        
        {/* Welcome Modal */}
        <WelcomeModal
          show={showWelcome}
          onHide={handleWelcomeClose}
          autoClose={true}
          autoCloseDelay={3000}
        />
      </div>
    </MovieProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={<Navigate to="/movies" replace />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/movies" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
