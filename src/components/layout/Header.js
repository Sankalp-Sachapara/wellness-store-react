import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <h1>HealthHub</h1>
            </Link>
          </div>

          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </div>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </li>
          </ul>

          <div className={`nav-buttons ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/cart" className="cart-icon" onClick={() => setMobileMenuOpen(false)}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </Link>

            {currentUser ? (
              <div className="user-menu">
                <span className="user-greeting">
                  <FontAwesomeIcon icon={faUser} />
                  {currentUser.username}
                </span>
                <div className="user-dropdown">
                  {currentUser.isAdmin && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                    My Orders
                  </Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn login-btn" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn register-btn" onClick={() => setMobileMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
