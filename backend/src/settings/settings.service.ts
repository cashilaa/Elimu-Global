import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserSettings } from './settings.schema';
import { UpdateSettingsDto, UpdatePasswordDto, UpdateNotificationSettingsDto } from './dto/update-settings.dto';
import { InstructorService } from '../instructor/instructor.service';
import * as bcrypt from 'bcrypt';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SettingsService {
  private readonly s3: S3;

  constructor(
    @InjectModel(UserSettings.name) private settingsModel: Model<UserSettings>,
    private readonly instructorService: InstructorService,
    private readonly configService: ConfigService,
  ) {
    this.s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async getSettings(userId: string) {
    const settings = await this.settingsModel.findOne({ userId: new Types.ObjectId(userId) });
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }
    return settings;
  }

  async updateSettings(userId: string, updateSettingsDto: UpdateSettingsDto) {
    const settings = await this.settingsModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: updateSettingsDto },
      { new: true, upsert: true }
    );
    return settings;
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const instructor = await this.instructorService.findOne(userId);
    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      instructor.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    await this.instructorService.update(userId, { password: hashedPassword });

    return { message: 'Password updated successfully' };
  }

  async updateNotificationSettings(userId: string, updateDto: UpdateNotificationSettingsDto) {
    const settings = await this.settingsModel.findOne({ userId: new Types.ObjectId(userId) });
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }

    settings.notificationPreferences = {
      ...settings.notificationPreferences,
      [updateDto.setting]: updateDto.value,
    };

    await settings.save();
    return settings;
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    const key = `avatars/${userId}/${Date.now()}-${file.originalname}`;

    const uploadResult = await this.s3.upload({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }).promise();

    const settings = await this.settingsModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { avatar: uploadResult.Location } },
      { new: true, upsert: true }
    );

    return settings;
  }

  async toggleDarkMode(userId: string, darkMode: boolean) {
    const settings = await this.settingsModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { 'appearance.darkMode': darkMode } },
      { new: true, upsert: true }
    );
    return settings;
  }
}
