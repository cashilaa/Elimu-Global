import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<Settings>
  ) {}

  async getSettings() {
    const settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      return this.createDefaultSettings();
    }
    return settings;
  }

  async updateSettings(settingsData: any) {
    const settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }
    
    Object.assign(settings, settingsData);
    return settings.save();
  }

  private async createDefaultSettings() {
    const defaultSettings = new this.settingsModel({
      siteName: 'Elimu Learning Platform',
      adminEmail: 'admin@elimu.com',
      timezone: 'UTC+3',
      language: 'en',
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        digestFrequency: 'daily',
        quietHours: {
          start: '22:00',
          end: '06:00'
        }
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 30,
        passwordExpiry: 90,
        maxLoginAttempts: 5
      }
    });

    return defaultSettings.save();
  }
} 