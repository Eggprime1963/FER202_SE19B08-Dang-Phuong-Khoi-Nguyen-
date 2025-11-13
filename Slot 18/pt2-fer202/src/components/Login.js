/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const authState = useAuthState();
  const { login, clearError } = useAuthDispatch();
  const { loading, error, user } = authState;

  // Clear error when component mounts
  useEffect(() => {
    clearError && clearError();
  }, [clearError]);

  // Redirect when user logs in after showing welcome modal
  useEffect(() => {
    if (user) {
      // Show welcome modal before redirecting
      sessionStorage.setItem('showWelcomeModal', 'true');
      navigate('/payments');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!credentials.username.trim()) {
      setErrorMsg("Username or Email is required.");
      setShowErrorModal(true);
      return false;
    }
    if (!credentials.password) {
      setErrorMsg("Password is required.");
      setShowErrorModal(true);
      return false;
    }
    if (credentials.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setShowErrorModal(true);
      return false;
    }
    // Email format validation if username contains @
    if (credentials.username.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.username)) {
        setErrorMsg("Invalid email format.");
        setShowErrorModal(true);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await login(credentials.username.trim(), credentials.password);
    if (result.success) {
      // Navigation will be handled by useEffect
    } else {
      setErrorMsg("Invalid username/email or password!");
      setShowErrorModal(true);
    }
  };

  const handleDemoLogin = (username, password) => setCredentials({ username, password });

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMsg('');
    clearError && clearError();
  };


  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100">
        <Col md={8} lg={6} xl={5} className="mx-auto">
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-2">💰 TuitionTracker</h2>
              <p className="mb-0">Student Tuition Payment System</p>
            </Card.Header>

            <Card.Body className="p-4">
              {(errorMsg || error) && (
                <Alert variant="danger" onClose={closeErrorModal} dismissible>
                  <Alert.Heading>Đăng nhập thất bại</Alert.Heading>
                  <p>{errorMsg || error}</p>
                  <p className="text-muted small mb-0">Vui lòng kiểm tra lại username và mật khẩu.</p>
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Username or Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username or email"
                    size="lg"
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Nhập mật khẩu"
                    size="lg"
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 mb-4"
                  disabled={loading || !credentials.username.trim() || !credentials.password.trim()}
                >
                  {loading && (
                    <Spinner animation="border" size="sm" className="me-2" />
                  )}
                  {loading ? 'Đang đăng nhập...' : '🚀 Đăng nhập'}
                </Button>
              </Form>

              <hr />

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;