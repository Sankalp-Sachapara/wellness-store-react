import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/users/login', { email, password });
      
      if (response.data && response.data.token) {
        const user = {
          id: response.data.userId,
          email: response.data.email,
          username: response.data.username,
          token: response.data.token,
          isAdmin: response.data.isAdmin
        };
        
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/users/register', { 
        username, 
        email, 
        password 
      });
      
      if (response.data && response.data.token) {
        const user = {
          id: response.data.userId,
          email: response.data.email,
          username: response.data.username,
          token: response.data.token,
          isAdmin: response.data.isAdmin || false
        };
        
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        login, 
        register, 
        logout, 
        loading, 
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
