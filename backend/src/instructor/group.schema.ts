import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true })
  name: string;

  @Prop({ default: [] })
  members: string[]; // Array of user IDs or emails
}

export const GroupSchema = SchemaFactory.createForClass(Group);
