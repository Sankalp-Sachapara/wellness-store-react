import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests if available
api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

// Product related API calls
export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Search products
  searchProducts: async (query) => {
    try {
      const response = await api.get(`/products?search=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// User related API calls
export const userService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Cart related API calls
export const cartService = {
  // Get user cart
  getCart: async () => {
    try {
      const response = await api.get('/carts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Add item to cart
  addToCart: async (productId, quantity) => {
    try {
      const response = await api.post('/carts', { productId, quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update cart item quantity
  updateCartItem: async (productId, quantity) => {
    try {
      const response = await api.put(`/carts/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Remove item from cart
  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/carts/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Clear cart
  clearCart: async () => {
    try {
      const response = await api.delete('/carts');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Order related API calls
export const orderService = {
  // Get user orders
  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update order to paid
  updateOrderToPaid: async (orderId, paymentResult) => {
    try {
      const response = await api.put(`/orders/${orderId}/pay`, paymentResult);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
