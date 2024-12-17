import { IsString, IsEmail, IsOptional, IsArray, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

class SocialLinksDto {
  @IsOptional()
  @IsUrl()
  linkedin: string;

  @IsOptional()
  @IsUrl()
  twitter: string;

  @IsOptional()
  @IsUrl()
  website: string;
}

export class CreateInstructorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  expertise: string;

  @IsString()
  experience: string;

  @IsString()
  education: string;

  @IsOptional()
  @IsString()
  certification?: string;

  @IsArray()
  @IsString({ each: true })
  teachingAreas: string[];

  @IsString()
  bio: string;

  @ValidateNested()
  @Type(() => SocialLinksDto)
  socialLinks: SocialLinksDto;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
