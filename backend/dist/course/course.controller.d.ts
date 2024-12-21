import { CourseService } from './course.service';
import { NotificationService } from '../modules/notification/notification.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDocument, Analytics } from './schemas/course.schema';
export declare class CourseController {
    private readonly courseService;
    private readonly notificationService;
    constructor(courseService: CourseService, notificationService: NotificationService);
    createCourse(createCourseDto: CreateCourseDto): Promise<CourseDocument>;
    findAll(query: any): Promise<CourseDocument[]>;
    findOne(id: string): Promise<CourseDocument>;
    findByInstructor(instructorId: string): Promise<CourseDocument[]>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseDocument>;
    updateStatus(id: string, status: string): Promise<CourseDocument>;
    enrollStudent(courseId: string, studentId: string): Promise<CourseDocument>;
    addReview(courseId: string, reviewData: {
        studentId: string;
        rating: number;
        comment: string;
    }): Promise<CourseDocument>;
    getAnalytics(id: string): Promise<Analytics | null>;
    delete(id: string): Promise<CourseDocument>;
}
