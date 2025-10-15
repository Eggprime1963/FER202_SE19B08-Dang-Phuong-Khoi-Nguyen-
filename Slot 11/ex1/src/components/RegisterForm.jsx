import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function RegisterForm() {
    // State for form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // State for error
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // State for form validity
    const [isValid, setIsValid] = useState(false);
    
    // State for submission status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Validate username
    const validateUsername = (username) => {
        // Only letters, numbers, underscore or period allowed, no spaces at start/end
        const usernameRegex = /^[a-zA-Z0-9_.]+$/;
        
        if (!username.trim()) {
            return "Username is required";
        } else if (username.trim() !== username) {
            return "Username cannot have spaces at beginning or end";
        } else if (username.length < 3) {
            return "Username must be at least 3 characters";
        } else if (!usernameRegex.test(username)) {
            return "Username can only contain letters, numbers, _ or .";
        }
        return "";
    };

    // Validate email
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!email.trim()) {
            return "Email is required";
        } else if (!emailRegex.test(email)) {
            return "Invalid email format";
        }
        return "";
    };

    // Validate password
    const validatePassword = (password) => {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (!password) {
            return "Password is required";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters";
        } else if (!passwordRegex.test(password)) {
            return "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
        }
        return "";
    };

    // Validate confirm password
    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) {
            return "Please confirm your password";
        } else if (confirmPassword !== password) {
            return "Passwords do not match";
        }
        return "";
    };

    // Validate all fields
    const validateForm = () => {
        const usernameError = validateUsername(formData.username);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
        
        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });
        
        // Form is valid if there are no errors
        return !(usernameError || emailError || passwordError || confirmPasswordError);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            
            // Simulate API call with timeout
            setTimeout(() => {
                setIsSubmitting(false);
                setShowSuccess(true);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                    handleReset();
                }, 3000);
                
                console.log("Form data:", formData);
            }, 1000);
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
        setErrors({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    // Add CSS animation for spinner
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Check form validity on every change
    useEffect(() => {
        const usernameError = validateUsername(formData.username);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
        
        // Update error messages
        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });
        
        // Form is valid when all fields have values and there are no errors
        const allFieldsFilled = formData.username.trim() !== '' && 
                              formData.email.trim() !== '' && 
                              formData.password !== '' && 
                              formData.confirmPassword !== '';
                              
        setIsValid(allFieldsFilled && !(usernameError || emailError || passwordError || confirmPasswordError));
    }, [formData]);

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 className="text-center mb-4">Account Registration</h2>
            
            {showSuccess && (
                <div 
                    style={{
                        padding: '15px',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        border: '1px solid #c3e6cb',
                        textAlign: 'center',
                        animation: 'fadeIn 0.5s'
                    }}
                >
                    <strong>Registration successful!</strong> 
                    <p className="mb-0">Your account has been created.</p>
                </div>
            )}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                        placeholder="Nhập username (≥ 3 ký tự, chỉ gồm chữ, số, _, .)"
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
                        placeholder="Nhập email"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        placeholder="Enter password (≥ 8 characters, with uppercase, lowercase, number, special character)"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="confirmPassword">
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
                    <Button 
                        variant="secondary" 
                        type="button" 
                        onClick={handleReset}
                        style={{
                            padding: '8px 20px',
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#5a6268';
                            e.currentTarget.style.borderColor = '#545b62';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#6c757d';
                            e.currentTarget.style.borderColor = '#6c757d';
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={!isValid || isSubmitting}
                        style={{
                            padding: '8px 20px',
                            transition: 'all 0.3s',
                            backgroundColor: isValid && !isSubmitting ? '#007bff' : '#cccccc',
                            borderColor: isValid && !isSubmitting ? '#007bff' : '#bbbbbb',
                            cursor: isValid && !isSubmitting ? 'pointer' : 'not-allowed',
                            boxShadow: isValid && !isSubmitting ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                            position: 'relative',
                            minWidth: '140px'
                        }}
                        onMouseOver={(e) => {
                            if (isValid && !isSubmitting) {
                                e.currentTarget.style.backgroundColor = '#0069d9';
                                e.currentTarget.style.borderColor = '#0062cc';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (isValid && !isSubmitting) {
                                e.currentTarget.style.backgroundColor = '#007bff';
                                e.currentTarget.style.borderColor = '#007bff';
                                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                            }
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <span 
                                    style={{
                                        display: 'inline-block',
                                        width: '16px',
                                        height: '16px',
                                        border: '3px solid rgba(255,255,255,0.3)',
                                        borderTop: '3px solid #fff',
                                        borderRadius: '50%',
                                        marginRight: '8px',
                                        animation: 'spin 1s linear infinite',
                                        verticalAlign: 'text-bottom'
                                    }}
                                /> Processing...
                            </>
                        ) : isValid ? 'Register' : 'Complete all fields'}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default RegisterForm;