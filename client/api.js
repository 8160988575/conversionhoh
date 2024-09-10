import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);
// const API = axios.create({
//   baseURL: 'http://localhost:5000',
//   withCredentials: true,
// });

export default API;
