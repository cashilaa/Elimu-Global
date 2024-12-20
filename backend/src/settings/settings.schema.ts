import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserSettings extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  bio?: string;

  @Prop({ type: String })
  website?: string;

  @Prop({ type: String })
  avatar?: string;

  @Prop({ type: String, default: 'en' })
  language: string;

  @Prop({ type: String, default: 'UTC' })
  timezone: string;

  @Prop({
    type: Object,
    default: {
      email: true,
      push: true,
      marketing: false
    }
  })
  notificationPreferences: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };

  @Prop({
    type: Object,
    default: {
      darkMode: false,
    }
  })
  appearance: {
    darkMode: boolean;
  };
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
