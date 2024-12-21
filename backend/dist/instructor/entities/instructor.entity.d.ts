import { Document } from 'mongoose';
export declare class Instructor extends Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    expertise: string;
    experience: string;
    education: string;
    certification?: string;
    teachingAreas: string[];
    bio: string;
    socialLinks: {
        linkedin: string;
        twitter: string;
        website: string;
    };
    avatarUrl?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const InstructorSchema: import("mongoose").Schema<Instructor, import("mongoose").Model<Instructor, any, any, any, Document<unknown, any, Instructor> & Instructor & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Instructor, Document<unknown, {}, import("mongoose").FlatRecord<Instructor>> & import("mongoose").FlatRecord<Instructor> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
