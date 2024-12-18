import axios from 'axios';

const ADMIN_CREDENTIALS = {
  email: 'admin@elimu.com',
  password: 'admin123'
};

export const authService = {
  async login(credentials: { email: string; password: string }) {
    // Check against hardcoded credentials
    if (credentials.email === ADMIN_CREDENTIALS.email && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      const user = {
        id: '1',
        email: ADMIN_CREDENTIALS.email,
        fullName: 'Admin User',
        role: 'admin'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'admin-token');
      return { user, token: 'admin-token' };
    }
    
    throw new Error('Invalid credentials');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  getToken() {
    return localStorage.getItem('token');
  },
};