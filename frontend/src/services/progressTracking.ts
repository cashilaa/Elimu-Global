import { io } from 'socket.io-client';

class ProgressTrackingService {
  private socket;
  private progressListeners = new Set<(progress: any) => void>();

  constructor() {
    this.socket = io('http://localhost:3000/progress', {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('progressUpdate', (progress) => {
      this.progressListeners.forEach(listener => listener(progress));
    });

    this.socket.on('contentComplete', (data) => {
      this.fetchProgress(data.courseId);
    });
  }

  async trackProgress(courseId: string, contentId: string, progress: number) {
    try {
      await fetch(`/api/progress/${courseId}/content/${contentId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progress })
      });

      // Emit progress update through socket
      this.socket.emit('updateProgress', {
        courseId,
        contentId,
        progress
      });
    } catch (error) {
      console.error('Failed to track progress:', error);
    }
  }

  async fetchProgress(courseId: string) {
    try {
      const response = await fetch(`/api/progress/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const progress = await response.json();
      this.progressListeners.forEach(listener => listener(progress));
      return progress;
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      return null;
    }
  }

  onProgressUpdate(callback: (progress: any) => void) {
    this.progressListeners.add(callback);
    return () => this.progressListeners.delete(callback);
  }

  disconnect() {
    this.socket.disconnect();
    this.progressListeners.clear();
  }
}

export const progressTrackingService = new ProgressTrackingService(); 