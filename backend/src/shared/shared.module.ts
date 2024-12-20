import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from '../instructor/instructor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema }
    ])
  ],
  exports: [MongooseModule]
})
export class SharedModule {} 