import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCheckCircle, faSpinner, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { orderService } from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login?redirect=/orders');
      return;
    }
    
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch your orders. Please try again later.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentUser, navigate]);
  
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get status icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon delivered" />;
      case 'shipped':
        return <FontAwesomeIcon icon={faBox} className="status-icon shipped" />;
      case 'processing':
        return <FontAwesomeIcon icon={faSpinner} className="status-icon processing" />;
      case 'cancelled':
        return <FontAwesomeIcon icon={faTimes} className="status-icon cancelled" />;
      default:
        return <FontAwesomeIcon icon={faExclamationTriangle} className="status-icon pending" />;
    }
  };
  
  if (loading) {
    return (
      <div className="orders-loading container">
        <p>Loading your orders...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="orders-error container">
        <p>{error}</p>
        <Link to="/" className="btn btn-secondary">
          Return to Home
        </Link>
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="no-orders container">
        <h1 className="page-title">My Orders</h1>
        <div className="no-orders-content">
          <FontAwesomeIcon icon={faBox} className="no-orders-icon" />
          <h2>You have no orders yet</h2>
          <p>Looks like you haven't placed any orders yet. Start shopping to see your orders here.</p>
          <Link to="/products" className="btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="orders-page">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <p className="order-id">Order #{order._id.substring(0, 8)}</p>
                  <p className="order-date">Placed on {formatDate(order.createdAt)}</p>
                </div>
                
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={`status-text ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.productId} className="order-item">
                    <div className="item-image">
                      <img 
                        src={item.imageUrl || '/images/placeholder.jpg'} 
                        alt={item.name} 
                      />
                    </div>
                    
                    <div className="item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-totals">
                  <p className="order-total-text">Total</p>
                  <p className="order-total-price">${order.totalPrice.toFixed(2)}</p>
                </div>
                
                <Link to={`/orders/${order._id}`} className="btn btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
