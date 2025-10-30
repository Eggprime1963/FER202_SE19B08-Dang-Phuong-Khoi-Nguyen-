import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Login = ({ onLoginSuccess }) => {
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
      onLoginSuccess();
    }
  }, [isAuthenticated, onLoginSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.username.trim() || !credentials.password.trim()) {
      return;
    }

    const result = await login(credentials.username, credentials.password);
    
    if (result.success) {
      onLoginSuccess();
    }
  };

  // Demo accounts info
  const demoAccounts = [
    { username: 'admin', password: '123456', role: 'Admin' },
    { username: 'user1', password: 'password123', role: 'User' },
    { username: 'manager', password: 'manager123', role: 'Manager' }
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center">
              <h3>🎬 Movie Management System</h3>
              <p className="mb-0">Đăng nhập vào hệ thống</p>
            </Card.Header>
            
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                  <strong>Lỗi đăng nhập:</strong> {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>👤 Tên đăng nhập</Form.Label>
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
                  <Form.Label>🔒 Mật khẩu</Form.Label>
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
                  disabled={loading || !credentials.username.trim() || !credentials.password.trim()}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Đang đăng nhập...
                    </>
                  ) : (
                    '🚀 Đăng Nhập'
                  )}
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="bg-light">
              <small className="text-muted">
                <strong>📝 Tài khoản demo:</strong>
                <div className="mt-2">
                  {demoAccounts.map((account, index) => (
                    <div key={index} className="mb-1">
                      <code>{account.username}</code> / <code>{account.password}</code> ({account.role})
                    </div>
                  ))}
                </div>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;