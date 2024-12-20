import { Types } from 'mongoose';

export interface Notification {
  id: string;
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
} 