import { Model } from 'mongoose';
import { CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    create(createCourseDto: CreateCourseDto): Promise<CourseDocument>;
    findAll(filter?: any): Promise<CourseDocument[]>;
    findOne(id: string): Promise<CourseDocument | null>;
    findByInstructor(instructorId: string): Promise<CourseDocument[]>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseDocument | null>;
    updateStatus(id: string, status: string): Promise<CourseDocument | null>;
    addStudent(courseId: string, studentId: string): Promise<CourseDocument | null>;
    addReview(courseId: string, studentId: string, rating: number, comment: string): Promise<CourseDocument | null>;
    updateAnalytics(courseId: string): Promise<CourseDocument | null>;
    delete(id: string): Promise<CourseDocument | null>;
}
