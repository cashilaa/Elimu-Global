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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Document, Schema as MongooseSchema } from 'mongoose';
export type CourseDocument = Course & Document;
interface Review {
    student: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
interface Analytics {
    enrollments: number;
    averageRating: number;
    activeStudents: number;
    revenue: number;
}
export declare class Course {
    title: string;
    description: string;
    instructor: string;
    modules: Array<{
        title: string;
        description: string;
        content: Array<{
            type: string;
            title: string;
            description: string;
            url?: string;
            duration?: number;
        }>;
    }>;
    students: string[];
    reviews: Review[];
    analytics: Analytics;
    pricing: {
        amount: number;
        currency: string;
    };
    publishedAt?: Date;
    status: string;
}
export declare const CourseSchema: MongooseSchema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course> & Course & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
