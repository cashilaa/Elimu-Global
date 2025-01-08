import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { CourseStatus } from '../schemas/course.schema';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  instructor: string;

  @IsNumber()
  price: number;

  @IsString()
  duration: string;

  @IsString()
  level: string;

  @IsString()
  @IsOptional()
  pdfUrl?: string;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  instructor?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  pdfUrl?: string;
}