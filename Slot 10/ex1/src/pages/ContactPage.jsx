import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', formData);
      setFormSubmitted(true);
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  return (
    <div className="contact-page-container">
      <div className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        
        <div className="row">
          <div className="col-md-6">
            {formSubmitted ? (
              <div className="thank-you-message">
                <i className="bi bi-check-circle-fill success-icon"></i>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
                <button 
                  className="btn btn-primary mt-3" 
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.subject ? 'is-invalid' : ''}`}
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                  />
                  {formErrors.subject && <div className="invalid-feedback">{formErrors.subject}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                  ></textarea>
                  {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
                </div>
                
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            )}
          </div>
          
          <div className="col-md-6">
            <div className="contact-info-container">
              <h3>Get In Touch</h3>
              <p>Have questions, feedback, or suggestions? We'd love to hear from you. Use the form or contact us directly.</p>
              
              <div className="contact-info-item">
                <i className="bi bi-geo-alt contact-icon"></i>
                <div>
                  <h5>Address</h5>
                  <p>123 Movie Street, Cinema City, MC 10001</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <i className="bi bi-envelope contact-icon"></i>
                <div>
                  <h5>Email</h5>
                  <p>info@moviecollection.com</p>
                </div>
              </div>
              
              <div className="contact-info-item">
                <i className="bi bi-telephone contact-icon"></i>
                <div>
                  <h5>Phone</h5>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="social-media-links">
                <h5>Follow Us</h5>
                <div className="d-flex">
                  <a href="https://facebook.com" aria-label="Facebook" className="social-link">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://twitter.com" aria-label="Twitter" className="social-link">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="https://instagram.com" aria-label="Instagram" className="social-link">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://youtube.com" aria-label="YouTube" className="social-link">
                    <i className="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;