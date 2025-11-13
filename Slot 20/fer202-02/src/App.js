import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ExpenseProvider } from './contexts/ExpenseContext';
import ExpenseManager from './components/ExpenseManager';
import { useAuthState, AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppLayout = () => {
  const { user } = useAuthState();

  if (!user) {
    return <Login />;
  }

  return (
    <ExpenseProvider>
      <div className="App">
        <Header />
        <main>
          <ExpenseManager />
        </main>
        <Footer />
      </div>
    </ExpenseProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          
          {/* PROTECTED ROUTES */}
          <Route path="/home" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          } />
          
          {/* REDIRECT ROUTES */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 ROUTE */}
          <Route path="*" element={
            <div className="page-container text-center py-5">
              <h1>404 - Page Not Found</h1>
              <p>Sorry, the page you're looking for doesn't exist.</p>
              <a href="/login" className="btn btn-primary">Go to Login</a>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
