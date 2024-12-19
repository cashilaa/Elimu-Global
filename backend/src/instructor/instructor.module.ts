import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { Instructor, InstructorSchema } from './instructor.schema';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { GroupSchema } from './schemas/group.schema';
import { NotificationModule } from '../notification/notification.module';
import { ZoomModule } from '../zoom/zoom.module';

// instructor.module.ts
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema },
      { name: Group.name, schema: GroupSchema },
    ]),
    JwtModule.register({}), // Add this line to import JwtModule
    NotificationModule,
    ZoomModule,
  ],
  controllers: [InstructorController, GroupController],
  providers: [InstructorService, GroupService],
  exports: [InstructorService, GroupService],
})
export class InstructorModule {}
