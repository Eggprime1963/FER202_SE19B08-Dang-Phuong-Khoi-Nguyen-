import { useState } from 'react';
import AboutForm from '../components/Account/AboutForm';
import AccountForm from '../components/Account/AccountForm';
import AddressForm from '../components/Account/AddressForm';
import './AccountPage.css';

function AccountPage() {
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
    
    // Show success message or redirect
    alert('Profile successfully created!');
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

  return (
    <div className="account-page-container">
      <h2 className="account-page-title text-center mb-4">Build Your Profile</h2>
      
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
  );
}

export default AccountPage;