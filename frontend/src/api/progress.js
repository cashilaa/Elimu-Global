export const progressApi = {
  getProgress: async () => {
    const response = await fetch('/api/progress', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    return response.json();
  },

  updateProgress: async (courseId, progress) => {
    const response = await fetch(`/api/progress/${courseId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ progress })
    });

    return response.json();
  }
}; 