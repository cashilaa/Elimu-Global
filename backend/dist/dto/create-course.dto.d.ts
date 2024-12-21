declare class ContentDto {
    type: string;
    title: string;
    description: string;
    url?: string;
    duration?: number;
}
declare class ModuleDto {
    title: string;
    description: string;
    content: ContentDto[];
}
export declare class CreateCourseDto {
    title: string;
    description: string;
    modules: ModuleDto[];
    thumbnail?: string;
    duration: string;
    level: string;
    category: string;
    status?: string;
}
export {};
