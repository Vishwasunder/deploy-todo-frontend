import axios from 'axios';

// Set up base URL for all API calls
export const api = axios.create({
  baseURL: 'https://deploy-todo-backend.onrender.com'
});