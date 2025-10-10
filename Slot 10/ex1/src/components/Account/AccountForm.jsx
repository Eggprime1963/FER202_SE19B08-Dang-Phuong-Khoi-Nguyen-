import { useState } from 'react';
import './AccountForm.css';

function AccountForm({ onNext, onPrevious, progress }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    secretQuestion: false,
    secretAnswer: false
  });

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const validateUsername = () => {
    return username.trim() !== '' && username.length >= 4;
  };

  const validatePassword = () => {
    // Password must be at least 8 characters with at least one number and one special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateConfirmPassword = () => {
    return confirmPassword === password && password !== '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      username: true,
      password: true,
      confirmPassword: true,
      secretQuestion: true,
      secretAnswer: true
    };
    setTouched(allTouched);
    
    // Validate all fields before proceeding
    if (validateUsername() && validatePassword() && validateConfirmPassword()) {
      // Call the onNext prop with the form data
      onNext({
        username,
        password,

      });
    }
  };

  return (
    <div className="account-form-container">
      <h4 className="mb-4">
        <i className="bi bi-lock me-2"></i>
        Account Information
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username *</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person"></i>
            </span>
            <input 
              type="text" 
              className={`form-control ${touched.username && !validateUsername() ? 'is-invalid' : ''}`}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur('username')}
              required
            />
            {touched.username && !validateUsername() && (
              <div className="invalid-feedback">
                Username must be at least 4 characters long
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password *</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-key"></i>
            </span>
            <input 
              type="password" 
              className={`form-control ${touched.password && !validatePassword() ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              required
            />
            {touched.password && !validatePassword() && (
              <div className="invalid-feedback">
                Password must be at least 8 characters and include at least one number and one special character
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-check-circle"></i>
            </span>
            <input 
              type="password" 
              className={`form-control ${touched.confirmPassword && !validateConfirmPassword() ? 'is-invalid' : ''}`}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              required
            />
            {touched.confirmPassword && !validateConfirmPassword() && (
              <div className="invalid-feedback">
                Passwords do not match
              </div>
            )}
          </div>
        </div>
        
        <div className="d-flex justify-content-between mt-4">
          <button 
            type="button" 
            className="btn btn-outline-secondary"
            onClick={onPrevious}
          >
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

export default AccountForm;