import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faUser,
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would submit the form data to your backend here
      // For now, we'll just simulate a successful submission
      setSubmitStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Have a question or need assistance? We're here to help! Reach out to us through any of 
            the contact methods below or send us a message using the form.
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3>Email</h3>
                <p>info@healthhub.com</p>
                <p>support@healthhub.com</p>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <h3>Phone</h3>
                <p>(123) 456-7890</p>
                <p>Mon-Fri, 9am-5pm EST</p>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <h3>Address</h3>
                <p>123 Wellness Street</p>
                <p>Health City, HC 12345</p>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <h3>Hours</h3>
                <p>Monday-Friday: 9am-5pm</p>
                <p>Saturday: 10am-2pm</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            
            {submitStatus.submitted && submitStatus.success && (
              <div className="success-message">
                {submitStatus.message}
              </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                </div>
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                  />
                </div>
                {errors.subject && <p className="error-message">{errors.subject}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <p className="error-message">{errors.message}</p>}
              </div>
              
              <button type="submit" className="btn submit-btn">
                <FontAwesomeIcon icon={faPaperPlane} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
