import { IsString, IsArray, IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ContentDto {
  @IsEnum(['video', 'document', 'quiz', 'assignment'])
  type: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsOptional()
  duration?: number;
}

class ModuleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  content: ContentDto[];
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  modules: ModuleDto[];

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  duration: string;

  @IsEnum(['beginner', 'intermediate', 'advanced'])
  level: string;

  @IsString()
  category: string;

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: string;
} 