import { useState } from 'react';
import './AboutForm.css';

function AboutForm({ onNext, progress }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    age: false
  });

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const validateFirstName = () => {
    return firstName.trim() !== '';
  };

  const validateLastName = () => {
    return lastName.trim() !== '';
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{10,}$/;
    return phone === '' || phoneRegex.test(phone);
  };

  const validateAge = () => {
    return age === '' || (parseInt(age) >= 18 && parseInt(age) <= 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      age: true
    };
    setTouched(allTouched);
    
    // Validate all fields before proceeding
    if (validateFirstName() && validateLastName() && validateEmail() && validatePhone() && validateAge()) {
      // Call the onNext prop with the form data
      onNext({
        firstName,
        lastName,
        email,
        phone,
        age,
        avatar
      });
    }
  };

  return (
    <div className="account-form-container">
      <h4 className="mb-4">
        <i className="bi bi-person-circle me-2"></i>
        About You
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">First Name *</label>
            <input 
              type="text" 
              className={`form-control ${touched.firstName && !validateFirstName() ? 'is-invalid' : ''}`}
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => handleBlur('firstName')}
              required
            />
            {touched.firstName && !validateFirstName() && (
              <div className="invalid-feedback">
                First name is required
              </div>
            )}
          </div>
          
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name *</label>
            <input 
              type="text" 
              className={`form-control ${touched.lastName && !validateLastName() ? 'is-invalid' : ''}`}
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => handleBlur('lastName')}
              required
            />
            {touched.lastName && !validateLastName() && (
              <div className="invalid-feedback">
                Last name is required
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address *</label>
          <input 
            type="email" 
            className={`form-control ${touched.email && !validateEmail() ? 'is-invalid' : ''}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            required
          />
          {touched.email && !validateEmail() && (
            <div className="invalid-feedback">
              Please enter a valid email address
            </div>
          )}
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className={`form-control ${touched.phone && !validatePhone() ? 'is-invalid' : ''}`}
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => handleBlur('phone')}
            />
            {touched.phone && !validatePhone() && (
              <div className="invalid-feedback">
                Please enter a valid phone number (at least 10 digits)
              </div>
            )}
          </div>
          
          <div className="col-md-6">
            <label htmlFor="age" className="form-label">Age</label>
            <input 
              type="number" 
              className={`form-control ${touched.age && !validateAge() ? 'is-invalid' : ''}`}
              id="age"
              min="18"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onBlur={() => handleBlur('age')}
            />
            {touched.age && !validateAge() && (
              <div className="invalid-feedback">
                Age must be between 18 and 100
              </div>
            )}
          </div>
        </div>
        
        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-outline-secondary" disabled>
            Previous
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
      
      <div className="progress mt-4">
        <div 
          className="progress-bar" 
          role="progressbar" 
          style={{ width: `${progress}%` }}
          aria-valuenow={progress} 
          aria-valuemin="0" 
          aria-valuemax="100"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}

export default AboutForm;