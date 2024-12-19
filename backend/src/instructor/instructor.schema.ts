import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type InstructorDocument = Instructor & Document;

@Schema({ timestamps: true })
export class Instructor {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
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

  @Prop({ type: [String], required: true })
  teachingAreas: string[];

  @Prop({ required: true })
  bio: string;

  @Prop({ type: Object })
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };

  @Prop()
  profilePicture?: string;

  @Prop({ default: true })
  isVerified: boolean;

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);

// Add pre-save middleware
InstructorSchema.pre<InstructorDocument>('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
