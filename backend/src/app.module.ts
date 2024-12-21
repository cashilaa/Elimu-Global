import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CourseGenerationModule } from './modules/course-generation.module';
import { ZoomModule } from './modules/zoom.module';
import { CoursesModule } from './courses/courses.module';
import { GroupModule } from './instructor/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI || 'mongodb+srv://Shilla:cashi7378@cluster0.20ozn.mongodb.net/elimu_global',
      }),
    }),
    NotificationModule,
    AuthModule,
    CourseModule,
    CourseGenerationModule,
    ZoomModule,
    CoursesModule,
    GroupModule,
  ],
})
export class AppModule {}