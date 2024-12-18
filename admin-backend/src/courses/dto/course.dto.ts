import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { CourseStatus } from '../schemas/course.schema';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  instructor: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus;
}

export class UpdateCourseDto extends CreateCourseDto {
  @IsOptional()
  name: string;

  @IsOptional()
  instructor: string;

  @IsOptional()
  price: number;
} 