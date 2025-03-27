import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  // Generate star rating display
  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="product-rating">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={`full-${i}`} icon={faStar} />
        ))}
        
        {halfStar && (
          <FontAwesomeIcon icon={faStarHalfAlt} />
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon key={`empty-${i}`} icon={farStar} />
        ))}
        
        <span className="rating-value">({rating})</span>
      </div>
    );
  };
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };
  
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-link">
        <div className="product-image">
          <img 
            src={product.imageUrl || '/images/placeholder.jpg'} 
            alt={product.name} 
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
          {renderStarRating(product.rating)}
          
          <div className="product-actions">
            <button 
              className="btn btn-sm add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <Link 
              to={`/products/${product._id}`} 
              className="btn btn-sm btn-secondary view-details-btn"
            >
              View Details
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
