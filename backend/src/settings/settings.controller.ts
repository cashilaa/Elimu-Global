import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SettingsService } from './settings.service';
import {
  UpdateSettingsDto,
  UpdatePasswordDto,
  UpdateNotificationSettingsDto,
} from './dto/update-settings.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @Roles('instructor', 'student')
  async getSettings(@CurrentUser() userId: string) {
    return this.settingsService.getSettings(userId);
  }

  @Put('profile')
  @Roles('instructor', 'student')
  async updateSettings(
    @CurrentUser() userId: string,
    @Body() updateSettingsDto: UpdateSettingsDto,
  ) {
    return this.settingsService.updateSettings(userId, updateSettingsDto);
  }

  @Put('password')
  @Roles('instructor', 'student')
  async updatePassword(
    @CurrentUser() userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.settingsService.updatePassword(userId, updatePasswordDto);
  }

  @Put('notifications')
  @Roles('instructor', 'student')
  async updateNotificationSettings(
    @CurrentUser() userId: string,
    @Body() updateDto: UpdateNotificationSettingsDto,
  ) {
    return this.settingsService.updateNotificationSettings(userId, updateDto);
  }

  @Put('avatar')
  @Roles('instructor', 'student')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @CurrentUser() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File must be an image');
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 10MB');
    }

    return this.settingsService.uploadAvatar(userId, file);
  }

  @Put('appearance/dark-mode')
  @Roles('instructor', 'student')
  async toggleDarkMode(
    @CurrentUser() userId: string,
    @Body('darkMode') darkMode: boolean,
  ) {
    return this.settingsService.toggleDarkMode(userId, darkMode);
  }
}
