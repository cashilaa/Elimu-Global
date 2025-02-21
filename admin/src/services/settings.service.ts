import axios from 'axios';

const API_URL = 'https://centralize-auth-elimu.onrender.com/admin/settings';

export const settingsService = {
  async getSettings() {
    const response = await axios.get(`${API_URL}/settings`);
    return response.data;
  },

  async updateSettings(settingsData: any) {
    const response = await axios.put(`${API_URL}/settings`, settingsData);
    return response.data;
  },

  async uploadLogo(file: File) {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await axios.post(`${API_URL}/settings/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};
