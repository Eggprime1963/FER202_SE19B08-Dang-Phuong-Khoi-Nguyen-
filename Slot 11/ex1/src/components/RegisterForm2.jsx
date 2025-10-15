import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

function RegisterForm2() {
  // Form data state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Form submission state
  const [isFormValid, setIsFormValid] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form data
  useEffect(() => {
    const newErrors = {};
    
    // Username validation
    if (formData.username.trim()) {
      const usernameRegex = /^[a-zA-Z0-9_.]+$/;
      if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (!usernameRegex.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, underscores and periods';
      }
    }
    
    // Email validation
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Password validation
    if (formData.password.trim()) {
      // Check individual requirements to give more helpful error messages
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must include at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = 'Password must include at least one lowercase letter';
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = 'Password must include at least one number';
      } else if (!/[@$!%*?&#]/.test(formData.password)) {
        newErrors.password = 'Password must include at least one special character (@$!%*?&#)';
      }
    }
    
    // Confirm password validation
    if (formData.confirmPassword.trim()) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    
    // Check if form is valid (all fields filled and no errors)
    const isValid = 
      formData.username.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      Object.keys(newErrors).length === 0;
      
    setIsFormValid(isValid);
  }, [formData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h3 className="mb-4 text-center">Registration Form</h3>
          
          {/* Toast notification */}
          <div
            style={{
              position: 'fixed',
              top: 20,
              right: 20,
              zIndex: 1060
            }}
          >
            <Toast 
              onClose={() => setShowToast(false)} 
              show={showToast} 
              delay={3000} 
              autohide
              bg="success"
            >
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
            </Toast>
          </div>
          
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Confirm password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleReset}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={!isFormValid}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-0">
            <Card.Body>
              <h5 className="text-center mb-3">Account Information</h5>
              <p><strong>Username:</strong> {formData.username}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p className="text-success">Your account has been created successfully!</p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm2;