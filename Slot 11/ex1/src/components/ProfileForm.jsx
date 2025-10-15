import React, { useState, useEffect } from 'react';
import { Form, Button, Toast, Modal, Card } from 'react-bootstrap';

function ProfileForm() {
    // State for form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    
    // State for form validation and submission
    const [isFormValid, setIsFormValid] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    // State for validation errors
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [ageError, setAgeError] = useState('');

    // Validate name
    const validateName = (value) => {
        if (!value.trim()) {
            setNameError('Name cannot be empty');
            return false;
        }
        setNameError('');
        return true;
    };

    // Validate email
    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!value.trim()) {
            setEmailError('Email cannot be empty');
            return false;
        } else if (!emailRegex.test(value)) {
            setEmailError('Invalid email format');
            return false;
        }
        setEmailError('');
        return true;
    };

    // Validate age
    const validateAge = (value) => {
        const ageNum = parseInt(value, 10);
        
        if (value === '') {
            setAgeError('Age cannot be empty');
            return false;
        } else if (isNaN(ageNum)) {
            setAgeError('Age must be a number');
            return false;
        } else if (ageNum < 18 || ageNum > 55) {
            setAgeError('Age must be between 18-55');
            return false;
        }
        setAgeError('');
        return true;
    };

    // Handle name change
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        validateName(value);
    };

    // Handle email change
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    // Handle age change
    const handleAgeChange = (e) => {
        const value = e.target.value;
        setAge(value);
        validateAge(value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isFormValid) {
            // Show toast and modal
            setShowToast(true);
            setShowModal(true);
        }
    };

    // Check form validity whenever inputs change
    useEffect(() => {
        const nameValid = validateName(name);
        const emailValid = validateEmail(email);
        const ageValid = validateAge(age);
        
        setIsFormValid(nameValid && emailValid && ageValid);
    }, [name, email, age]);

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 className="text-center mb-4">Personal Information</h2>
            
            {/* Toast Notification */}
            <Toast 
                show={showToast} 
                onClose={() => setShowToast(false)}
                style={{ 
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    minWidth: '200px'
                }}
                delay={3000}
                autohide
            >
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>Submitted successfully!</Toast.Body>
            </Toast>
            
            {/* Profile Form */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={handleNameChange}
                        isInvalid={!!nameError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {nameError}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        isInvalid={!!emailError}
                    />
                    <Form.Control.Feedback type="invalid">
                        {emailError}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter your age"
                        value={age}
                        onChange={handleAgeChange}
                        isInvalid={!!ageError}
                        min="18"
                        max="55"
                    />
                    <Form.Control.Feedback type="invalid">
                        {ageError}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                    <Button variant="primary" type="submit" disabled={!isFormValid}>
                        Submit
                    </Button>
                </div>
            </Form>
            
            {/* Modal with submitted data */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Submitted Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <Card.Title>Submitted Information</Card.Title>
                            <Card.Text>
                                <strong>Full Name:</strong> {name}<br />
                                <strong>Email:</strong> {email}<br />
                                <strong>Age:</strong> {age}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfileForm;