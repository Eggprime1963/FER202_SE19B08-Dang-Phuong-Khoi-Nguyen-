// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';
import { Spinner, Container } from 'react-bootstrap';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthState();

  // LOADING STATE - Replace with your loading component
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading...</p>
        </div>
      </Container>
    );
  }

  // AUTHENTICATION CHECK - Replace redirect route as needed
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;