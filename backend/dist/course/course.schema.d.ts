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
import { Document, Types } from 'mongoose';
export type CourseDocument = Course & Document & {
    _id: Types.ObjectId;
};
export declare class Course {
    title: string;
    description: string;
    category: string;
    instructor: string;
    students: string[];
    learningObjectives: string[];
    modules: {
        title: string;
        description: string;
        content: {
            type: string;
            url: string;
            duration?: number;
        }[];
    }[];
    pricing: {
        amount: number;
        currency: string;
        discountPrice?: number;
        discountValidUntil?: Date;
    };
    analytics: {
        enrollments: number;
        completionRate: number;
        averageRating: number;
        revenue: number;
        activeStudents: number;
    };
    reviews: {
        student: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}
export declare const CourseSchema: import("mongoose").Schema<Course, import("mongoose").Model<Course, any, any, any, Document<unknown, any, Course> & Course & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Course, Document<unknown, {}, import("mongoose").FlatRecord<Course>> & import("mongoose").FlatRecord<Course> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
