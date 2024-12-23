import { IsString, IsEmail, IsBoolean, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsNumber()
  @IsOptional()
  enrolledCourses?: number;

  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsNumber()
  @IsOptional()
  enrolledCourses?: number;

  @IsString()
  @IsOptional()
  status?: string;
} 