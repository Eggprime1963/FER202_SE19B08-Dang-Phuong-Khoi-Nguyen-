import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  
  const authState = useAuthState();
  const { login, clearError } = useAuthDispatch();
  const { loading, error, isAuthenticated } = authState;

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: both fields are required
    if (!credentials.username.trim() || !credentials.password.trim()) {
      return;
    }

    // Optional: check password length (at least 6 characters)
    if (credentials.password.length < 6) {
      return;
    }

    const result = await login(credentials.username, credentials.password);
    
    if (result && result.success) {
      navigate('/home');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center">
              <h3>Personal Budget Management</h3>
              <p className="mb-0">Login</p>
            </Card.Header>
            
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                  <strong>Error:</strong> {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập"
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={loading || !credentials.username.trim() || !credentials.password.trim() || credentials.password.length < 6}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </Button>
              </Form>
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;