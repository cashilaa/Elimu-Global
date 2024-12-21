/// <reference types="node" />
/// <reference types="node" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { UploadedFile } from '@nestjs/common';
import { S3Service } from '../services/s3.service';
import { InstructorService } from '../services/instructor.service';
import { UpdateInstructorDto } from '../dto/update-instructor.dto';
interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
export declare class InstructorController {
    private readonly s3Service;
    private readonly instructorService;
    constructor(s3Service: S3Service, instructorService: InstructorService);
    uploadProfilePicture(file: UploadedFile, req: any): Promise<{
        url: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/instructor.schema").Instructor> & import("../schemas/instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/instructor.schema").Instructor> & import("../schemas/instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateInstructorDto: UpdateInstructorDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/instructor.schema").Instructor> & import("../schemas/instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/instructor.schema").Instructor> & import("../schemas/instructor.schema").Instructor & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
export {};
