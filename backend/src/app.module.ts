import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://Shilla:cashi7378@cluster0.20ozn.mongodb.net/elimu_global'),
    AuthModule,
  ],
})
export class AppModule {}