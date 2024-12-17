import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructor, InstructorSchema } from '../instructor/instructor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Instructor.name, schema: InstructorSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
