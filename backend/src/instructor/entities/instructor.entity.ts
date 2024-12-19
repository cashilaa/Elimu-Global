import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Instructor extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ required: true })
  expertise: string;

  @Prop({ required: true })
  experience: string;

  @Prop({ required: true })
  education: string;

  @Prop()
  certification?: string;

  @Prop({ type: [{ type: String }] })
  teachingAreas: string[];

  @Prop({ type: String })
  bio: string;

  @Prop({ type: Object })
  socialLinks: {
    linkedin: string;
    twitter: string;
    website: string;
  };

  @Prop()
  avatarUrl?: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
