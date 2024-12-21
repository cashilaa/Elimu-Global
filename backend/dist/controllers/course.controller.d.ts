import { CourseService } from '../services/course.service';
import { NotificationService } from '../services/notification.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
interface RequestWithUser extends Request {
    user: {
        sub: string;
        email: string;
        role: string;
    };
}
export declare class CourseController {
    private readonly courseService;
    private readonly notificationService;
    constructor(courseService: CourseService, notificationService: NotificationService);
    create(req: RequestWithUser, createCourseDto: CreateCourseDto): Promise<import("../schemas/course.schema").CourseDocument>;
    findAll(req: RequestWithUser): Promise<import("../schemas/course.schema").CourseDocument[]>;
    findOne(id: string): Promise<import("../schemas/course.schema").CourseDocument>;
    update(req: RequestWithUser, id: string, updateCourseDto: UpdateCourseDto): Promise<import("../schemas/course.schema").CourseDocument>;
    remove(id: string): Promise<import("../schemas/course.schema").CourseDocument>;
}
export {};
