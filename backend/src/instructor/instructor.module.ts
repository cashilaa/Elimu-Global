import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { Course, CourseSchema } from '../course/course.schema';
import { Student, StudentSchema } from '../student/student.schema';
import { Session, SessionSchema } from '../session/session.schema';
import { Analytics, AnalyticsSchema } from '../analytics/analytics.schema';
import { Resource, ResourceSchema } from '../shared/schemas/resource.schema';
import { Notification, NotificationSchema } from '../shared/schemas/notification.schema';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SharedModule,
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Session.name, schema: SessionSchema },
      { name: Analytics.name, schema: AnalyticsSchema },
      { name: Resource.name, schema: ResourceSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    ConfigModule,
  ],
  controllers: [InstructorController],
  providers: [InstructorService],
  exports: [InstructorService],
})
export class InstructorModule {}
