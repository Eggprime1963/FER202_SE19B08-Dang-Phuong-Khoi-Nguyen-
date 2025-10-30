import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { AuthProvider, useAuthState } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import Login from './components/Login';
import Header from './components/Header';
import MovieManager from './components/MovieManager';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthState();
  return user ? children : <Navigate to="/login" replace />;
};

// Main App Layout component
const AppLayout = () => {
  const { user } = useAuthState();

  if (!user) {
    return <Login />;
  }

  return (
    <MovieProvider>
      <div className="App">
        <Header />
        <main>
          <MovieManager />
        </main>
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
