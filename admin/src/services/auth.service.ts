import axios from 'axios';

const ADMIN_CREDENTIALS = {
  email: 'admin@elimu.com',
  password: 'admin123'
};

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    // For testing, you can use these hardcoded credentials
    if (credentials.email === 'admin@elimu.com' && credentials.password === 'admin123') {
      const token = 'dummy-token';
      localStorage.setItem('token', token);
      return { token };
    }
    throw new Error('Invalid credentials');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      return { role: 'admin' }; // For testing purposes
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};