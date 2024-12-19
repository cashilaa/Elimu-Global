import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class Instructor extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  expertise: string;

  @Prop({ required: true })
  experience: string;

  @Prop({ required: true })
  education: string;

  @Prop()
  certification: string;

  @Prop({ type: [String], required: true })
  teachingAreas: string[];

  @Prop({ required: true })
  bio: string;

  @Prop({
    type: {
      linkedin: String,
      twitter: String,
      website: String,
    },
  })
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };

  @Prop()
  profilePicture: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: 'pending', enum: ['pending', 'active', 'suspended'] })
  status: string;

  @Prop({ type: [{ type: String, ref: 'Course' }] })
  courses: string[];

  @Prop({ type: Object })
  analytics: {
    totalStudents?: number;
    averageRating?: number;
    totalCourses?: number;
    totalRevenue?: number;
  };

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);

// Add password hashing middleware
InstructorSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Add password validation method
InstructorSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
