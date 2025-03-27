import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProductList from '../components/products/ProductList';
import { productService } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  
  // Handle query params for category filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);
  
  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let productsData;
        
        if (selectedCategory) {
          productsData = await productService.getProductsByCategory(selectedCategory);
        } else {
          productsData = await productService.getAllProducts();
        }
        
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);
  
  // Apply filters when search term or price range changes
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(product => {
        // Apply search filter
        const matchesSearch = searchTerm === '' || 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Apply price filter
        const matchesPrice = 
          product.price >= priceRange.min && 
          product.price <= priceRange.max;
        
        return matchesSearch && matchesPrice;
      });
      
      setFilteredProducts(filtered);
    }
  }, [searchTerm, priceRange, products]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  // Handle price range change
  const handlePriceChange = (type, e) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };
  
  // Handle reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 1000 });
  };
  
  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="page-title">Our Products</h1>
          
          <div className="mobile-filter-toggle" onClick={toggleFilters}>
            <FontAwesomeIcon icon={showFilters ? faTimes : faFilter} />
            <span>{showFilters ? 'Close Filters' : 'Show Filters'}</span>
          </div>
        </div>
        
        <div className="products-content">
          {/* Filters Sidebar */}
          <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filter-section">
              <h3>Search</h3>
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Categories</h3>
              <div className="category-filters">
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={handleCategoryChange}
                  />
                  <span>All Categories</span>
                </label>
                
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="supplements"
                    checked={selectedCategory === 'supplements'}
                    onChange={handleCategoryChange}
                  />
                  <span>Supplements</span>
                </label>
                
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="fitness"
                    checked={selectedCategory === 'fitness'}
                    onChange={handleCategoryChange}
                  />
                  <span>Fitness</span>
                </label>
                
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="nutrition"
                    checked={selectedCategory === 'nutrition'}
                    onChange={handleCategoryChange}
                  />
                  <span>Nutrition</span>
                </label>
                
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="skincare"
                    checked={selectedCategory === 'skincare'}
                    onChange={handleCategoryChange}
                  />
                  <span>Skincare</span>
                </label>
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-filter">
                <div className="price-inputs">
                  <div className="price-input">
                    <label>Min ($)</label>
                    <input
                      type="number"
                      min="0"
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e)}
                    />
                  </div>
                  
                  <div className="price-input">
                    <label>Max ($)</label>
                    <input
                      type="number"
                      min={priceRange.min}
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button className="btn btn-secondary" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
          
          {/* Products Grid */}
          <div className="products-grid">
            <div className="products-stats">
              <p>
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            <ProductList
              products={filteredProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
