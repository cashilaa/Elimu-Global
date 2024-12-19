import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { InstructorModule } from './instructor/instructor.module';
import { ZoomModule } from './zoom/zoom.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error('MONGODB_URI is not defined');
        }
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    InstructorModule,
    ZoomModule,
  ],
})
export class AppModule {}