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
