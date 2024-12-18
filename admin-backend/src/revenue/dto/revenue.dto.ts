import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateRevenueDto {
  @IsNumber()
  amount: number;

  @IsString()
  courseId: string;

  @IsString()
  studentId: string;

  @IsDate()
  paymentDate: Date;

  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateRevenueDto extends CreateRevenueDto {
  @IsOptional()
  amount: number;

  @IsOptional()
  courseId: string;

  @IsOptional()
  studentId: string;

  @IsOptional()
  paymentDate: Date;
} 