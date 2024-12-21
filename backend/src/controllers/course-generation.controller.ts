import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from '../services/gemini.service';

interface GenerateRequestDto {
  message: string;
  context: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

@Controller('ai')
export class CourseGenerationController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate')
  async generateCourse(@Body() body: GenerateRequestDto): Promise<any> {
    try {
      const { message, context } = body;

      if (!context || !Array.isArray(context)) {
        throw new Error('Invalid context format');
      }

      const stage = this.geminiService.determineStage(context);
      const response = await this.geminiService.generateResponse(message, stage);

      if (stage === 'final') {
        const courseData = await this.geminiService.generateCourseStructure(context);
        return {
          message: "I've generated your course structure! You can now review and customize it.",
          courseData
        };
      }

      return { message: response };
    } catch (error) {
      console.error('Course generation error:', error);
      throw error;
    }
  }
}