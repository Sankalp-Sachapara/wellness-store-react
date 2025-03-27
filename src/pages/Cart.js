import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faTrashAlt, 
  faMinus, 
  faPlus, 
  faArrowLeft, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    loading, 
    error, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalPrice 
  } = useContext(CartContext);
  
  const { currentUser } = useContext(AuthContext);
  
  const handleUpdateQuantity = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };
  
  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  if (loading) {
    return (
      <div className="cart-loading container">
        <p>Loading your cart...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="cart-error container">
        <p>{error}</p>
        <Link to="/products" className="btn btn-secondary">
          <FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping
        </Link>
      </div>
    );
  }
  
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <FontAwesomeIcon icon={faShoppingCart} className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products" className="btn">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={item.imageUrl || '/images/placeholder.jpg'} 
                    alt={item.name} 
                  />
                </div>
                
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">
                      <Link to={`/products/${item.productId}`}>{item.name}</Link>
                    </h3>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    
                    <button 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                  
                  <div className="cart-item-subtotal">
                    <p>Subtotal: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="cart-actions">
              <button 
                className="btn btn-secondary clear-cart-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <Link to="/products" className="btn btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-items">
              <div className="summary-item">
                <span>Subtotal</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              
              <div className="summary-item">
                <span>Shipping</span>
                <span>
                  {getTotalPrice() >= 50 ? (
                    <span className="free-shipping">
                      <FontAwesomeIcon icon={faCheckCircle} /> Free
                    </span>
                  ) : (
                    formatPrice(10) // Standard shipping fee
                  )}
                </span>
              </div>
              
              {getTotalPrice() < 50 && (
                <div className="shipping-note">
                  Add {formatPrice(50 - getTotalPrice())} more to qualify for free shipping
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-item total">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice() >= 50 ? getTotalPrice() : getTotalPrice() + 10)}</span>
              </div>
            </div>
            
            <Link 
              to={currentUser ? "/checkout" : "/login?redirect=/checkout"}
              className="btn checkout-btn"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
