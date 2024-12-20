export const resourcesApi = {
  uploadFiles: async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await fetch('/api/resources/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    return response.json();
  },

  getResources: async (category = 'all') => {
    const response = await fetch(`/api/resources?category=${category}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.json();
  },

  searchResources: async (query) => {
    const response = await fetch(`/api/resources/search?q=${query}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.json();
  }
}; 