import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Shilla:cashi7378@cluster0.20ozn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    AuthModule,
    InstructorModule
    

  ],
})
export class AppModule {}