import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <FontAwesomeIcon icon={faExclamationTriangle} className="not-found-icon" />
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn">
              <FontAwesomeIcon icon={faHome} /> Go to Home
            </Link>
            <Link to="/products" className="btn btn-secondary">
              <FontAwesomeIcon icon={faShoppingBasket} /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
