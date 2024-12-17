import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean } from 'class-validator';

export class CreateContentDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['video', 'document', 'quiz', 'assignment'])
  type: 'video' | 'document' | 'quiz' | 'assignment';

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsBoolean()
  @IsOptional()
  transcoded?: boolean;

  @IsString()
  @IsOptional()
  originalUrl?: string;

  @IsString()
  @IsOptional()
  streamingUrl?: string;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @IsNumber()
  @IsOptional()
  moduleIndex?: number;

  @IsNumber()
  @IsOptional()
  contentIndex?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsOptional()
  metadata?: {
    lastUpdated?: Date;
    version?: number;
    downloadable?: boolean;
    estimatedDuration?: number;
  };
}

export class UpdateContentDto extends CreateContentDto {}
