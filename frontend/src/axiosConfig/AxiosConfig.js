import axios from 'axios';


// Get the token from localStorage
const token = localStorage.getItem('token');

// Set up Axios interceptor to include the token in all requests
axios.interceptors.request.use((config) => {
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default axios;
