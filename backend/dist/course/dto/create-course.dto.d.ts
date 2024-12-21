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
declare class PricingDto {
    amount: number;
    currency: string;
}
export declare class CreateCourseDto {
    title: string;
    description: string;
    modules: ModuleDto[];
    pricing: PricingDto;
    status?: string;
}
export {};
