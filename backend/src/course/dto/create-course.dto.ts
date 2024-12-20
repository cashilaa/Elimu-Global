import { IsString, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { Types } from 'mongoose';
import { CourseContent } from '../../shared/types/course-content';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  instructor: Types.ObjectId | string;

  @IsArray()
  content: CourseContent[];

  @IsOptional()
  @IsNumber()
  enrollmentLimit?: number;

  @IsBoolean()
  isPublic: boolean;

  @IsBoolean()
  requiresApproval: boolean;

  @IsBoolean()
  certificateEnabled: boolean;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsString()
  @IsOptional()
  currency?: string;
} 