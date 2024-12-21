import { IsString, IsArray, IsOptional, IsEnum, IsNumber, ValidateNested } from 'class-validator';
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

  @IsNumber()
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

class PricingDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;
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

  @ValidateNested()
  @Type(() => PricingDto)
  pricing: PricingDto;

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: string;
} 