import { Controller, Get, Put, Body, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SettingsService } from './settings.service';
import { Express } from 'express';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  updateSettings(@Body() settingsData: any) {
    return this.settingsService.updateSettings(settingsData);
  }

  @Post('logo')
  @UseInterceptors(FileInterceptor('logo'))
  uploadLogo(@UploadedFile() file: Express.Multer.File) {
    // Implement file upload logic
    return { url: `/uploads/${file.filename}` };
  }
} 