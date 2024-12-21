import { InstructorService } from './instructor.service';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
export declare class InstructorController {
    private readonly instructorService;
    constructor(instructorService: InstructorService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./instructor.schema").Instructor> & import("./instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./instructor.schema").Instructor> & import("./instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateInstructorDto: UpdateInstructorDto): Promise<import("mongoose").Document<unknown, {}, import("./instructor.schema").Instructor> & import("./instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./instructor.schema").Instructor> & import("./instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
