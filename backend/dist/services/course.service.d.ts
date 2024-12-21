import { Model } from 'mongoose';
import { CourseDocument } from '../schemas/course.schema';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
export declare class CourseService {
    private courseModel;
    constructor(courseModel: Model<CourseDocument>);
    create(createCourseDto: CreateCourseDto, instructorId: string): Promise<CourseDocument>;
    findAll(instructorId: string): Promise<CourseDocument[]>;
    findOne(id: string): Promise<CourseDocument>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseDocument>;
    remove(id: string): Promise<CourseDocument>;
}
