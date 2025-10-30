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

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/movies');
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) return;

    const result = await login(credentials.username.trim(), credentials.password);
    if (result.success) {
      navigate('/movies');
    } else {
      setErrorMsg(result.error || 'Đăng nhập thất bại.');
      setShowErrorModal(true);
    }
  };

  const handleDemoLogin = (username, password) => setCredentials({ username, password });

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMsg('');
    clearError && clearError();
  };

  const demoAccounts = [
    { username: 'admin', password: '123456', role: 'Admin', color: 'danger', description: 'Toàn quyền (CRUD)' },
    { username: 'user1', password: 'password123', role: 'User', color: 'success', description: 'Chỉ xem' },
    { username: 'manager', password: 'manager123', role: 'Manager', color: 'warning', description: 'Thêm/Sửa phim' }
  ];

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Row className="w-100">
        <Col md={8} lg={6} xl={5} className="mx-auto">
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-2">🎬 Movie Management System</h2>
              <p className="mb-0">Hệ thống quản lý phim với xác thực và bộ lọc nâng cao</p>
            </Card.Header>

            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" dismissible onClose={clearError} className="mb-4">
                  <Alert.Heading className="fs-6">❌ Lỗi đăng nhập</Alert.Heading>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">👤 Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập"
                    size="lg"
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">🔒 Mật khẩu</Form.Label>
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

              {/* Demo Accounts */}
              <div className="text-center">
                <h6 className="text-muted mb-3">📋 Tài khoản demo</h6>
                <Row className="g-2">
                  {demoAccounts.map((account, index) => (
                    <Col key={index} lg={4} md={6}>
                      <Card
                        className="border-0 bg-light cursor-pointer h-100"
                        onClick={() => handleDemoLogin(account.username, account.password)}
                        style={{ cursor: 'pointer' }}
                      >
                        <Card.Body className="text-center p-2">
                          <Badge bg={account.color} className="mb-1">
                            {account.role}
                          </Badge>
                          <div className="small">
                            <strong>{account.username}</strong>
                            <br />
                            <code className="text-muted">{account.password}</code>
                            <br />
                            <span className="text-muted">{account.description}</span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <small className="text-muted mt-2 d-block">💡 Nhấn vào tài khoản để điền tự động</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Error Modal */}
      <Modal show={!!errorMsg || !!error} onHide={closeErrorModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thất bại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMsg || error}</p>
          <p className="text-muted small">Vui lòng kiểm tra lại username và mật khẩu.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeErrorModal}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;