import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NotificationSchema, Notification } from '../shared/schemas/notification.schema';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
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

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'UTC' })
  timezone: string;

  @Prop()
  profilePicture?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }] })
  courses: Types.ObjectId[];

  @Prop({ type: [NotificationSchema], default: [] })
  notifications: Notification[];

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
