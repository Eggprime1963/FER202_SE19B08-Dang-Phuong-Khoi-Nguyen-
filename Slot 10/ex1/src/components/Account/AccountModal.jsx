import { useState } from 'react';
import AboutForm from './AboutForm';
import AccountForm from './AccountForm';
import AddressForm from './AddressForm';
import './AccountModal.css';

function AccountModal({ show, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // About form data
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    avatar: null,
    
    // Account form data
    username: '',
    password: '',
    secretQuestion: '',
    secretAnswer: '',
    
    // Address form data
    street: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const handleNextStep = (data) => {
    // Update form data with the new values
    setFormData({
      ...formData,
      ...data
    });
    
    // Move to the next step
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFinish = (data) => {
    // Update form data with the final values
    const finalFormData = {
      ...formData,
      ...data
    };
    
    setFormData(finalFormData);
    
    // Here you would typically submit the data to an API
    console.log('Form submitted with data:', finalFormData);
    
    // Show success message and close modal
    alert('Profile successfully created!');
    onClose();
  };

  // Calculate progress based on current step
  const progress = Math.round((step / 3) * 100);
  
  // Render the appropriate form based on the current step
  const renderForm = () => {
    switch (step) {
      case 1:
        return <AboutForm onNext={handleNextStep} progress={progress} />;
      case 2:
        return <AccountForm onNext={handleNextStep} onPrevious={handlePreviousStep} progress={progress} />;
      case 3:
        return <AddressForm onPrevious={handlePreviousStep} onFinish={handleFinish} progress={progress} />;
      default:
        return <AboutForm onNext={handleNextStep} progress={progress} />;
    }
  };

  // Reset form state when modal is closed
  const handleClose = () => {
    setStep(1);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="account-modal">
        <div className="modal-header">
          <h2 className="account-modal-title">Build Your Profile</h2>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
        
        <div className="modal-body">
          <div className="wizard-navigation mb-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${step === 1 ? 'active' : ''}`}
                  onClick={() => step > 1 && setStep(1)}
                  disabled={step < 1}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  About
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${step === 2 ? 'active' : ''}`}
                  onClick={() => step > 2 && setStep(2)}
                  disabled={step < 2}
                >
                  <i className="bi bi-lock me-2"></i>
                  Account
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${step === 3 ? 'active' : ''}`}
                  onClick={() => step > 3 && setStep(3)}
                  disabled={step < 3}
                >
                  <i className="bi bi-geo-alt me-2"></i>
                  Address
                </button>
              </li>
            </ul>
          </div>
          
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

export default AccountModal;