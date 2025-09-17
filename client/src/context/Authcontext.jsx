// src/contexts/AuthContext.js
import { createContext, useContext, useState,useEffect } from 'react';
import api from "../services/api.js"
import { useNavigate } from 'react-router-dom';

// Create context
const AuthContext = createContext();

// Export the hook for easy access
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //const navigate = useNavigate();

     // Check if user is logged in on initial load
   // Verify token on app load
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/auth/verify'); // Your verification endpoint
        setUser(response.data.user);
      } catch (err) {
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

   const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('authToken', response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };



  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,user,setUser, login, logout, loading }}>
     {!loading && children}
    </AuthContext.Provider>
  );
};
