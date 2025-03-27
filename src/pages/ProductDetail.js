import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faStarHalfAlt, 
  faMinus, 
  faPlus, 
  faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { CartContext } from '../context/CartContext';
import { productService } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await productService.getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (newQty) => {
    if (newQty >= 1) {
      setQuantity(newQty);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
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
  
  if (loading) {
    return (
      <div className="product-detail-loading container">
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="product-detail-error container">
        <p>{error}</p>
        <Link to="/products" className="btn btn-secondary">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
        </Link>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-not-found container">
        <p>Product not found</p>
        <Link to="/products" className="btn btn-secondary">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="back-link">
          <Link to="/products">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Products
          </Link>
        </div>
        
        <div className="product-detail">
          <div className="product-image">
            <img 
              src={product.imageUrl || '/images/placeholder.jpg'} 
              alt={product.name} 
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta">
              <p className="product-category">{product.category}</p>
              {renderStarRating(product.rating)}
            </div>
            
            <p className="product-price">{formatPrice(product.price)}</p>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            {product.inStock && (
              <>
                <div className="product-quantity">
                  <span>Quantity:</span>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(quantity + 1)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                
                <button 
                  className="btn add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </>
            )}
            
            {!product.inStock && (
              <p className="out-of-stock">Out of Stock</p>
            )}
          </div>
        </div>
        
        <div className="product-details-tabs">
          <div className="tab-content">
            <div className="details-section">
              <h3>Product Details</h3>
              <ul>
                {product.details && product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
                {(!product.details || product.details.length === 0) && (
                  <li>No additional details available for this product.</li>
                )}
              </ul>
            </div>
            
            <div className="details-section">
              <h3>Shipping Information</h3>
              <p>Free shipping on orders over $50. Standard delivery within 3-5 business days.</p>
            </div>
            
            <div className="details-section">
              <h3>Return Policy</h3>
              <p>We accept returns within 30 days of delivery. Please see our return policy for more details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
