import React, { useReducer } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';

// Initial state
const initialState = {
  email: '',
  password: '',
  isEmailValid: true,
  isPasswordValid: true,
  isSubmitted: false,
  isSuccessful: false,
  errorMessage: '',
};

// Mock credentials for demo purposes
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'password123';

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.payload,
        isEmailValid: true, // Reset validation on change
        errorMessage: ''
      };
    
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        password: action.payload,
        isPasswordValid: true, // Reset validation on change
        errorMessage: ''
      };
    
    case 'VALIDATE_FORM':
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailPattern.test(state.email);
      
      // Password validation - minimum 6 characters
      const isPasswordValid = state.password.length >= 6;
      
      return {
        ...state,
        isEmailValid,
        isPasswordValid,
        errorMessage: !isEmailValid 
          ? 'Vui lòng nhập email hợp lệ'
          : !isPasswordValid 
          ? 'Mật khẩu phải có ít nhất 6 ký tự'
          : '',
      };
    
    case 'SUBMIT_FORM':
      // Check if credentials match
      const isSuccessful = state.email === VALID_EMAIL && state.password === VALID_PASSWORD;
      
      return {
        ...state,
        isSubmitted: true,
        isSuccessful,
        errorMessage: !isSuccessful 
          ? 'Email hoặc mật khẩu không chính xác'
          : ''
      };
    
    case 'RESET_FORM':
      return initialState;
      
    default:
      return state;
  }
};

function LoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const { 
    email, 
    password, 
    isEmailValid, 
    isPasswordValid, 
    isSubmitted, 
    isSuccessful,
    errorMessage 
  } = state;

  const handleEmailChange = (e) => {
    dispatch({ type: 'UPDATE_EMAIL', payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // First validate the form
    dispatch({ type: 'VALIDATE_FORM' });
    
    // If both email and password are valid format, attempt submission
    if (isEmailValid && isPasswordValid && email && password) {
      dispatch({ type: 'SUBMIT_FORM' });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <>
      <Modal show={isSubmitted && isSuccessful} onHide={handleReset} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Nhập Thành Công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">Đăng nhập thành công! Chào mừng trở lại, {email}.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleReset}>
            Đăng nhập lại
          </Button>
        </Modal.Footer>
      </Modal>
      <Card className="p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Card.Title className="mb-4">Đăng Nhập</Card.Title>

        <Form onSubmit={handleSubmit}>
          {errorMessage && !isSuccessful && (
             <Modal show={isSubmitted && !isSuccessful} onHide={handleReset} centered>
              <Modal.Header closeButton>
                <Modal.Title>Đăng Nhập Thất Bại</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="mb-0">{errorMessage}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleReset}>
                  Đăng nhập lại
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!isEmailValid} />
            {!isEmailValid && (
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập email hợp lệ.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={!isPasswordValid} />
            {!isPasswordValid && (
              <Form.Control.Feedback type="invalid">
                Mật khẩu phải có ít nhất 6 ký tự.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
            <Button variant="secondary" type="button" onClick={handleReset}>
              Xóa
            </Button>
          </div>

          <div className="mt-3">
            <p className="text-muted">
              <small>* Đăng nhập với email: user@example.com và mật khẩu: password123</small>
            </p>
          </div>
        </Form>
      </Card></>
  )
};

export default LoginForm;