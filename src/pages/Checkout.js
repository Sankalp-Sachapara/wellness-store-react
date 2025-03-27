import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { orderService } from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'creditCard'
  });
  
  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!currentUser) {
      navigate('/login?redirect=/checkout');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [currentUser, cartItems, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Calculate prices
      const itemsPrice = getTotalPrice();
      const shippingPrice = itemsPrice > 50 ? 0 : 10;
      const taxPrice = parseFloat((itemsPrice * 0.05).toFixed(2));
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      
      // Create order
      const orderData = {
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      };
      
      // Submit order to API
      const order = await orderService.createOrder(orderData);
      
      // Clear cart
      await clearCart();
      
      // Redirect to order confirmation
      navigate(`/orders/${order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="checkout-content">
          <div className="checkout-form-container">
            <h2>Shipping Information</h2>
            
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <h2>Payment Method</h2>
              
              <div className="payment-methods">
                <div className="payment-method">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={formData.paymentMethod === 'creditCard'}
                    onChange={handleChange}
                  />
                  <label htmlFor="creditCard">Credit Card</label>
                </div>
                
                <div className="payment-method">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              
              {error && <p className="error-message">{error}</p>}
              
              <button
                type="submit"
                className="btn place-order-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.productId} className="summary-item">
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="summary-row">
                <span>Items:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>
                  {getTotalPrice() > 50 ? 'Free' : '$10.00'}
                </span>
              </div>
              
              <div className="summary-row">
                <span>Tax (5%):</span>
                <span>${(getTotalPrice() * 0.05).toFixed(2)}</span>
              </div>
              
              <div className="summary-row total">
                <span>Total:</span>
                <span>
                  ${(
                    getTotalPrice() + 
                    (getTotalPrice() > 50 ? 0 : 10) + 
                    (getTotalPrice() * 0.05)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
