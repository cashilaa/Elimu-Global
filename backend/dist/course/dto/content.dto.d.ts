export declare class CreateContentDto {
    title: string;
    description?: string;
    type: 'video' | 'document' | 'quiz' | 'assignment';
    duration?: number;
    transcoded?: boolean;
    originalUrl?: string;
    streamingUrl?: string;
    thumbnailUrl?: string;
    moduleIndex?: number;
    contentIndex?: number;
    isPublished?: boolean;
    metadata?: {
        lastUpdated?: Date;
        version?: number;
        downloadable?: boolean;
        estimatedDuration?: number;
    };
}
export declare class UpdateContentDto extends CreateContentDto {
}
