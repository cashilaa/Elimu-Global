import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Settings extends Document {
  @Prop({ required: true })
  siteName: string;

  @Prop({ required: true })
  adminEmail: string;

  @Prop()
  timezone: string;

  @Prop()
  language: string;

  @Prop()
  logo: string;

  @Prop({ type: Object })
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    digestFrequency: string;
    quietHours: {
      start: string;
      end: string;
    };
  };

  @Prop({ type: Object })
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    maxLoginAttempts: number;
  };
}

export const SettingsSchema = SchemaFactory.createForClass(Settings); 