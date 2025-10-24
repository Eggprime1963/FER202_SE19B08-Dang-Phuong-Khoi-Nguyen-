import React, { useReducer } from 'react';
import { Form, Button, Card, Alert, Row, Col, Modal } from 'react-bootstrap';

// Initial state
const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  gender: '',
  agreement: false,
  validation: {
    fullName: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    password: { isValid: true, message: '' },
    confirmPassword: { isValid: true, message: '' },
    phoneNumber: { isValid: true, message: '' },
    gender: { isValid: true, message: '' },
    agreement: { isValid: true, message: '' }
  },
  isSubmitted: false,
  isSuccessful: false
};

// Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.payload,
        // Reset validation for the field being updated
        validation: {
          ...state.validation,
          [action.field]: { isValid: true, message: '' }
        }
      };
    
    case 'VALIDATE_FORM':
      // Create a new validation object
      const validation = { ...state.validation };
      let isFormValid = true;
      
      // Validate full name (required, at least 2 words)
      if (!state.fullName.trim()) {
        validation.fullName = { isValid: false, message: 'Vui lòng nhập họ và tên' };
        isFormValid = false;
      } else if (state.fullName.trim().split(/\s+/).length < 2) {
        validation.fullName = { isValid: false, message: 'Vui lòng nhập đầy đủ họ và tên' };
        isFormValid = false;
      }
      
      // Validate email (required, valid format)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!state.email.trim()) {
        validation.email = { isValid: false, message: 'Vui lòng nhập email' };
        isFormValid = false;
      } else if (!emailPattern.test(state.email)) {
        validation.email = { isValid: false, message: 'Email không hợp lệ' };
        isFormValid = false;
      }
      
      // Validate password (required, min 8 chars, contains digit and special char)
      const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!state.password) {
        validation.password = { isValid: false, message: 'Vui lòng nhập mật khẩu' };
        isFormValid = false;
      } else if (!passwordPattern.test(state.password)) {
        validation.password = { 
          isValid: false, 
          message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm số và ký tự đặc biệt' 
        };
        isFormValid = false;
      }
      
      // Validate confirm password (matches password)
      if (state.password !== state.confirmPassword) {
        validation.confirmPassword = { 
          isValid: false, 
          message: 'Xác nhận mật khẩu không khớp' 
        };
        isFormValid = false;
      }
      
      // Validate phone number (optional, but if provided must be valid VN format)
      const phonePattern = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
      if (state.phoneNumber && !phonePattern.test(state.phoneNumber)) {
        validation.phoneNumber = { 
          isValid: false, 
          message: 'Số điện thoại không hợp lệ (phải là số điện thoại Việt Nam)' 
        };
        isFormValid = false;
      }
      
      // Validate gender (required)
      if (!state.gender) {
        validation.gender = { isValid: false, message: 'Vui lòng chọn giới tính' };
        isFormValid = false;
      }
      
      // Validate agreement (must be checked)
      if (!state.agreement) {
        validation.agreement = { 
          isValid: false, 
          message: 'Bạn phải đồng ý với điều khoản dịch vụ' 
        };
        isFormValid = false;
      }
      
      return {
        ...state,
        validation,
        isSuccessful: isFormValid
      };
    
    case 'SUBMIT_FORM':
      return {
        ...state,
        isSubmitted: true
      };
    
    case 'RESET_FORM':
      return initialState;
      
    default:
      return state;
  }
};

function SignUpForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const { 
    fullName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    gender,
    agreement,
    validation,
    isSubmitted,
    isSuccessful
  } = state;

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    dispatch({ 
      type: 'UPDATE_FIELD', 
      field, 
      payload: value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    dispatch({ type: 'VALIDATE_FORM' });
    
    // Submit if validation passes
    setTimeout(() => {
      if (state.isSuccessful) {
        dispatch({ type: 'SUBMIT_FORM' });
      }
    }, 0);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <>
      {/* Success Modal */}
      <Modal show={isSubmitted && isSuccessful} onHide={handleReset} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Ký Thành Công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success" className="mb-3">
            Đăng ký thành công! Chào mừng {fullName}.
          </Alert>
          <div>
            <h5>Thông tin đăng ký:</h5>
            <p><strong>Họ và tên:</strong> {fullName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Số điện thoại:</strong> {phoneNumber || 'Không cung cấp'}</p>
            <p><strong>Giới tính:</strong> {gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Khác'}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleReset}>
            Đăng ký tài khoản mới
          </Button>
        </Modal.Footer>
      </Modal>
      
      <Card className="p-4" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <Card.Title className="mb-4">Đăng Ký Tài Khoản</Card.Title>
        
        <Form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <Form.Group className="mb-3" controlId="formFullName">
            <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập họ và tên"
              value={fullName}
              onChange={handleChange('fullName')}
              isInvalid={!validation.fullName.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {validation.fullName.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={handleChange('email')}
              isInvalid={!validation.email.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {validation.email.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Mật khẩu <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={handleChange('password')}
                  isInvalid={!validation.password.isValid}
                />
                <Form.Control.Feedback type="invalid">
                  {validation.password.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Xác nhận mật khẩu <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  isInvalid={!validation.confirmPassword.isValid}
                />
                <Form.Control.Feedback type="invalid">
                  {validation.confirmPassword.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Phone Number */}
          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Nhập số điện thoại (tùy chọn)"
              value={phoneNumber}
              onChange={handleChange('phoneNumber')}
              isInvalid={!validation.phoneNumber.isValid}
            />
            <Form.Control.Feedback type="invalid">
              {validation.phoneNumber.message}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Định dạng số điện thoại Việt Nam (VD: 0912345678)
            </Form.Text>
          </Form.Group>

          {/* Gender */}
          <Form.Group className="mb-3">
            <Form.Label>Giới tính <span className="text-danger">*</span></Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                label="Nam"
                checked={gender === 'male'}
                onChange={handleChange('gender')}
                isInvalid={!validation.gender.isValid}
              />
              <Form.Check
                inline
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                label="Nữ"
                checked={gender === 'female'}
                onChange={handleChange('gender')}
                isInvalid={!validation.gender.isValid}
              />
              <Form.Check
                inline
                type="radio"
                id="gender-other"
                name="gender"
                value="other"
                label="Khác"
                checked={gender === 'other'}
                onChange={handleChange('gender')}
                isInvalid={!validation.gender.isValid}
              />
            </div>
            {!validation.gender.isValid && (
              <div className="text-danger small mt-1">
                {validation.gender.message}
              </div>
            )}
          </Form.Group>

          {/* Terms Agreement */}
          <Form.Group className="mb-3 text-center" controlId="formAgreement">
            <Form.Check
              type="checkbox"
              label="Tôi đồng ý với các điều khoản dịch vụ"
              checked={agreement}
              onChange={handleChange('agreement')}
              isInvalid={!validation.agreement.isValid}
              className="d-inline-flex align-items-center"
            />
            {!validation.agreement.isValid && (
              <div className="text-danger small mt-1">
                {validation.agreement.message}
              </div>
            )}
          </Form.Group>
          
          {/* Submit and Reset buttons */}
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Đăng ký
            </Button>
            <Button variant="secondary" type="button" onClick={handleReset}>
              Xóa form
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
}

export default SignUpForm;