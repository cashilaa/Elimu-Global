import axios from 'axios';

const API_URL = 'https://centralize-auth-elimu.onrender.com/admin/users';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

const getAuthToken = () => {
  return localStorage.getItem('token'); // Updated to use the correct key
};

export const userService = {
  // Create a new user
  createUser: async (userData: User): Promise<User> => {
    try {
      const response = await axios.post(API_URL, userData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
      throw new Error('Failed to create user');
    }
  },

  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    try {
      const token = getAuthToken();
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching users:', error.response?.data || error.message);
      throw new Error('Failed to fetch users');
    }
  },

  // Get a single user by ID
  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      throw new Error('Failed to fetch user');
    }
  },

  // Update a user
  updateUser: async (id: string, userData: User): Promise<User> => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error.response?.data || error.message);
      throw new Error('Failed to update user');
    }
  },

  // Delete a user
  deleteUser: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('User ID is required');
    }
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
      throw new Error('Failed to delete user');
    }
  },
};
