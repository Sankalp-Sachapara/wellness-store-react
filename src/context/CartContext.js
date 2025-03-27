import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  // Load cart data when user logs in
  useEffect(() => {
    if (currentUser) {
      fetchCart();
    } else {
      // Use local storage cart for guests
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      } else {
        setCartItems([]);
      }
    }
  }, [currentUser]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!currentUser && cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  const fetchCart = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/carts', {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      
      setCartItems(response.data);
    } catch (err) {
      setError('Failed to fetch cart. Please try again.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if product already exists in cart
      const existingItemIndex = cartItems.findIndex(item => item.productId === product._id);
      
      if (existingItemIndex !== -1) {
        // Product exists, update quantity
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        
        if (currentUser) {
          // Update on server if logged in
          await axios.put(`/api/carts/${product._id}`, {
            quantity: updatedCartItems[existingItemIndex].quantity
          }, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          });
        }
        
        setCartItems(updatedCartItems);
      } else {
        // Add new product to cart
        const newCartItem = {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity,
          imageUrl: product.imageUrl
        };
        
        if (currentUser) {
          // Add to server if logged in
          await axios.post('/api/carts', {
            productId: product._id,
            quantity
          }, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          });
        }
        
        setCartItems([...cartItems, newCartItem]);
      }
    } catch (err) {
      setError('Failed to add item to cart. Please try again.');
      console.error('Error adding to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      
      if (currentUser) {
        // Remove from server if logged in
        await axios.delete(`/api/carts/${productId}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
      
      // Filter out the removed item
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.');
      console.error('Error removing from cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      setError(null);
      
      if (quantity <= 0) {
        return removeFromCart(productId);
      }
      
      const updatedCartItems = cartItems.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      );
      
      if (currentUser) {
        // Update on server if logged in
        await axios.put(`/api/carts/${productId}`, {
          quantity
        }, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
      
      setCartItems(updatedCartItems);
    } catch (err) {
      setError('Failed to update cart. Please try again.');
      console.error('Error updating cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (currentUser) {
        // Clear server cart if logged in
        await axios.delete('/api/carts', {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
      
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (err) {
      setError('Failed to clear cart. Please try again.');
      console.error('Error clearing cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
