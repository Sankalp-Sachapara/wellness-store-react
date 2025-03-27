import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faLeaf, 
  faHandHoldingHeart, 
  faShippingFast 
} from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1 className="page-title">About Us</h1>
          <p className="page-subtitle">
            Dedicated to bringing you premium health and wellness products for a better life.
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, HealthHub started with a simple mission: to make quality health and wellness products 
              accessible to everyone. We believe that good health is the foundation of a happy life, 
              and we're committed to helping you build that foundation.
            </p>
            <p>
              What began as a small collection of supplements has grown into a comprehensive wellness store 
              offering everything from vitamins and minerals to fitness equipment and natural skincare products. 
              As we've grown, our commitment to quality and customer satisfaction has remained unwavering.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-container">
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h3>Quality</h3>
                <p>
                  We thoroughly vet all our products to ensure they meet the highest standards of quality and efficacy.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faLeaf} />
                </div>
                <h3>Sustainability</h3>
                <p>
                  We're committed to environmentally responsible practices, from product sourcing to packaging.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faHandHoldingHeart} />
                </div>
                <h3>Customer Care</h3>
                <p>
                  Your satisfaction is our top priority. We're here to help you on your wellness journey.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <FontAwesomeIcon icon={faShippingFast} />
                </div>
                <h3>Accessibility</h3>
                <p>
                  We believe quality wellness products should be available to everyone, with fast shipping and fair prices.
                </p>
              </div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>Our Team</h2>
            <p>
              Behind HealthHub is a team of wellness enthusiasts, health experts, and customer service 
              professionals dedicated to providing you with the best possible shopping experience. 
              Our experts carefully research and select products, while our customer service team is always 
              ready to assist you with any questions or concerns.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Commitment</h2>
            <p>
              At HealthHub, we're committed to your satisfaction. From the moment you visit our store to the 
              delivery of your products, we strive to exceed your expectations. We stand behind our products 
              with a satisfaction guarantee and offer hassle-free returns.
            </p>
            <div className="about-cta">
              <Link to="/products" className="btn">Shop Our Products</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
