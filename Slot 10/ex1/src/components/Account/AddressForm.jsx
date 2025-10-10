import { useState } from 'react';
import './AddressForm.css';

function AddressForm({ onPrevious, onFinish, progress }) {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [touched, setTouched] = useState({
    street: false,
    city: false,
    country: false,
    zipCode: false
  });

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const validateStreet = () => {
    return street.trim() !== '';
  };

  const validateCity = () => {
    return city.trim() !== '';
  };

  const validateCountry = () => {
    return country !== '';
  };

  const validateZipCode = () => {
    // Simple ZIP code validation (can be adjusted for different country formats)
    const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
    return zipCode === '' || zipRegex.test(zipCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      street: true,
      city: true,
      country: true,
      zipCode: true
    };
    setTouched(allTouched);
    
    // Validate all fields before proceeding
    if (validateStreet() && validateCity() && validateCountry() && validateZipCode()) {
      // Call the onFinish prop with the form data
      onFinish({
        street,
        city,
        country,
        zipCode
      });
    }
  };

  return (
    <div className="account-form-container">
      <h4 className="mb-4">
        <i className="bi bi-geo-alt me-2"></i>
        Address Information
      </h4>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street Address *</label>
          <input 
            type="text" 
            className={`form-control ${touched.street && !validateStreet() ? 'is-invalid' : ''}`}
            id="street"
            placeholder="1234 Main St"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            onBlur={() => handleBlur('street')}
            required
          />
          {touched.street && !validateStreet() && (
            <div className="invalid-feedback">
              Street address is required
            </div>
          )}
        </div>
        
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City *</label>
          <input 
            type="text" 
            className={`form-control ${touched.city && !validateCity() ? 'is-invalid' : ''}`}
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onBlur={() => handleBlur('city')}
            required
          />
          {touched.city && !validateCity() && (
            <div className="invalid-feedback">
              City is required
            </div>
          )}
        </div>
        
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="country" className="form-label">Country *</label>
            <select 
              className={`form-select ${touched.country && !validateCountry() ? 'is-invalid' : ''}`}
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onBlur={() => handleBlur('country')}
              required
            >
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="CAN">Canada</option>
              <option value="VN">Vietnam</option>
              <option value="UK">United Kingdom</option>
              <option value="AUS">Australia</option>
              <option value="FRA">France</option>
              <option value="GER">Germany</option>
              <option value="JPN">Japan</option>
              <option value="CHN">China</option>
            </select>
            {touched.country && !validateCountry() && (
              <div className="invalid-feedback">
                Please select a country
              </div>
            )}
          </div>
          
          <div className="col-md-6">
            <label htmlFor="zipCode" className="form-label">ZIP / Postal Code</label>
            <input 
              type="text" 
              className={`form-control ${touched.zipCode && !validateZipCode() ? 'is-invalid' : ''}`}
              id="zipCode"
              placeholder="12345"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onBlur={() => handleBlur('zipCode')}
            />
            {touched.zipCode && !validateZipCode() && (
              <div className="invalid-feedback">
                Please enter a valid ZIP code (e.g. 12345 or 12345-6789)
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
          <button 
            type="submit" 
            className="btn btn-success"
          >
            Finish
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

export default AddressForm;