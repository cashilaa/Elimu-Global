import { IsString, IsEmail, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  enrolledCourses?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateStudentDto extends CreateStudentDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  email: string;
} 