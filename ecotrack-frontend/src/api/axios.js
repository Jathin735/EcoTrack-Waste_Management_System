import axios from 'axios';

// Get the token from localStorage
const token = localStorage.getItem('token');

// Create a base instance of Axios with the API URL and Authorization header
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default instance;
