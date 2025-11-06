import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuthState } from './contexts/AuthContext';
import { TuitionProvider } from './contexts/TuitionContext';
import Login from './components/Login';
import Header from './components/Header';
import WelcomeModal from './components/WelcomeModal';
import FilterBar from './components/FilterBar';
import TuitionTable from './components/TuitionTable';

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
    <TuitionProvider>
      <div className="App">
        <Header />
        
        {/* Welcome Modal */}
        <WelcomeModal
          show={showWelcome}
          onHide={handleWelcomeClose}
          autoClose={true}
          autoCloseDelay={3000}
        />

        {/* Main Content */}
        <div className="container py-4">
          <div className="row">
            <div className="col-12">
              <FilterBar />
              <TuitionTable />
            </div>
          </div>
        </div>
      </div>
    </TuitionProvider>
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
              path="/payments" 
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={<Navigate to="/payments" replace />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/payments" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
