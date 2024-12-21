import { GeminiService } from '../services/gemini.service';
interface GenerateRequestDto {
    message: string;
    context: Array<{
        role: 'user' | 'assistant';
        content: string;
    }>;
}
export declare class CourseGenerationController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    generateCourse(body: GenerateRequestDto): Promise<any>;
}
export {};
