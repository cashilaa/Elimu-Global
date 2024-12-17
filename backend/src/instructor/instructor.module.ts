import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { Instructor, InstructorSchema } from './instructor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Instructor.name, schema: InstructorSchema }]),
    JwtModule.register({
      secret: 'your-secret-key', // In production, use environment variable
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [InstructorController],
  providers: [InstructorService],
  exports: [InstructorService],
})
export class InstructorModule {}
