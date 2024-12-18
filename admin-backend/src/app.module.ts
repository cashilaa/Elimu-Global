import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { RevenueModule } from './revenue/revenue.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CoursesModule,
    StudentsModule,
    RevenueModule,
    SettingsModule,
  ],
})
export class AppModule {} 