import { Document } from 'mongoose';
export type CourseContentDocument = CourseContent & Document;
export declare class CourseContent {
    courseId: string;
    title: string;
    description: string;
    moduleIndex: number;
    contentIndex: number;
    type: string;
    videoContent: {
        originalUrl: string;
        streamingUrl: string;
        duration: number;
        thumbnailUrl: string;
        transcoded: boolean;
        qualities: {
            [key: string]: string;
        };
    };
    documentContent: {
        url: string;
        fileType: string;
        fileSize: number;
        previewUrl?: string;
    };
    quizContent: {
        questions: {
            question: string;
            options: string[];
            correctAnswer: number;
            explanation?: string;
        }[];
        timeLimit?: number;
        passingScore: number;
    };
    assignmentContent: {
        instructions: string;
        dueDate?: Date;
        maxScore: number;
        rubric?: {
            criteria: string;
            maxPoints: number;
        }[];
    };
    prerequisites: string[];
    isPublished: boolean;
    metadata: {
        lastUpdated: Date;
        version: number;
        downloadable: boolean;
        estimatedDuration: number;
    };
}
