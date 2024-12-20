import { IsString, IsEmail, IsUrl, IsOptional, IsObject, IsBoolean } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsObject()
  @IsOptional()
  notificationPreferences?: {
    email?: boolean;
    push?: boolean;
    marketing?: boolean;
  };

  @IsObject()
  @IsOptional()
  appearance?: {
    darkMode: boolean;
  };
}

export class UpdatePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  newPassword: string;
}

export class UpdateNotificationSettingsDto {
  @IsString()
  setting: 'email' | 'push' | 'marketing';

  @IsBoolean()
  value: boolean;
}
