import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills, faDumbbell, faAppleAlt, faSpa } from '@fortawesome/free-solid-svg-icons';
import ProductList from '../components/products/ProductList';
import { productService } from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, you might have an API endpoint for featured products
        // For now, we'll just get all products and take the first few
        const products = await productService.getAllProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (err) {
        setError('Failed to fetch featured products. Please try again later.');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Your Path to Wellness</h1>
            <p>Discover premium health and wellness products for a better life</p>
            <Link to="/products" className="btn">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories section">
        <div className="container">
          <h2 className="section-title">Product Categories</h2>
          
          <div className="category-container">
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faPills} />
              </div>
              <h3>Supplements</h3>
              <p>Vitamins & minerals to boost your health</p>
              <Link to="/products?category=supplements" className="btn btn-sm">
                View All
              </Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faDumbbell} />
              </div>
              <h3>Fitness</h3>
              <p>Equipment for your home workouts</p>
              <Link to="/products?category=fitness" className="btn btn-sm">
                View All
              </Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faAppleAlt} />
              </div>
              <h3>Nutrition</h3>
              <p>Healthy foods and dietary supplements</p>
              <Link to="/products?category=nutrition" className="btn btn-sm">
                View All
              </Link>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={faSpa} />
              </div>
              <h3>Skincare</h3>
              <p>Natural products for skin health</p>
              <Link to="/products?category=skincare" className="btn btn-sm">
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <ProductList 
            products={featuredProducts} 
            loading={loading} 
            error={error} 
          />
          
          <div className="view-all-products">
            <Link to="/products" className="btn">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          
          <div className="benefits-container">
            <div className="benefit-card">
              <h3>Premium Quality</h3>
              <p>All our products are carefully selected from trusted suppliers, ensuring you get only the best quality.</p>
            </div>
            
            <div className="benefit-card">
              <h3>Expert Advice</h3>
              <p>Our team of wellness experts is always ready to provide guidance for your health journey.</p>
            </div>
            
            <div className="benefit-card">
              <h3>Fast Delivery</h3>
              <p>Get your wellness products delivered right to your doorstep quickly and efficiently.</p>
            </div>
            
            <div className="benefit-card">
              <h3>Customer Satisfaction</h3>
              <p>Your satisfaction is our priority. We offer easy returns and excellent customer service.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
