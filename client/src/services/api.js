// src/services/api.js
import axios from 'axios';

 const api = axios.create({
  baseURL: 'https://blog-website-1-canh.onrender.com/api', 
  timeout: 10000,
});

// Public Posts
export const fetchPosts = async () => {
  try {
    const response = await api.get('/public/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};



export const registerUser = async (userData) => {
  try {
    const res = await axios.post('https://blog-website-1-canh.onrender.com/api/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};
export const login = async (credentials) => {
  try {
    const response = await api.post('https://blog-website-1-canh.onrender.com/api/auth/login', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};
export const resetPassword = async (userId, token, data) => {
  try {
    const response = await api.post(`https://blog-website-1-canh.onrender.com/api/auth/reset-password/${userId}/${token}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await api.post('https://blog-website-1-canh.onrender.com/api/uploads/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user=",user)
    
    // Ensure author is included in the payload
    const payload = {
      ...postData,
      author: user|| 'Unknown Author'
    };
    console.log(payload)

    const response = await api.post('https://blog-website-1-canh.onrender.com/api/posts/post', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
 // console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login on token failure
    }
    return Promise.reject(error);
  }
);
// services/api.js
export const fetchMyPosts = async () => {
  try {
    // Verify we have a token first
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // The backend will extract user ID from the JWT token
    const response = await api.get('https://blog-website-1-canh.onrender.com/api/posts');
    console.log(response)
    
    console.log('Backend response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    throw new Error(
      error.response?.data?.error || 
      error.response?.data?.message || 
      'Failed to fetch posts'
    );
  }
};


// Add to your existing API calls
export const fetchPostById = async (id) => {
  /* ... */
};

export default api