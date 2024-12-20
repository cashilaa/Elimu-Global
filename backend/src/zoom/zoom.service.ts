import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from '../instructor/instructor.schema';
import axios, { AxiosError } from 'axios';

@Injectable()
export class ZoomService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly accountId: string;
  private readonly baseUrl = 'https://api.zoom.us/v2';
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(
    private configService: ConfigService,
    @InjectModel(Instructor.name) private instructorModel: Model<Instructor>
  ) {
    const clientId = this.configService.get<string>('ZOOM_CLIENT_ID');
    const clientSecret = this.configService.get<string>('ZOOM_API_SECRET');
    const accountId = this.configService.get<string>('ZOOM_ACCOUNT_ID');

    if (!clientId || !clientSecret || !accountId) {
      throw new Error('Missing required Zoom configuration');
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accountId = accountId;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post<{ access_token: string; expires_in: number }>(
        'https://zoom.us/oauth/token',
        null,
        {
          params: {
            grant_type: 'account_credentials',
            account_id: this.accountId,
          },
          headers: {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
          },
        }
      );

      if (!response.data.access_token) {
        throw new Error('No access token received from Zoom');
      }

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Failed to get Zoom access token: ${axiosError.message}`);
    }
  }

  async createMeeting(instructorId: string, courseData: any) {
    const instructor = await this.instructorModel.findById(instructorId);
    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    const token = await this.getAccessToken();
    const meetingOptions = {
      topic: courseData.title,
      type: 2,
      start_time: courseData.startTime,
      duration: courseData.duration,
      timezone: instructor.timezone || 'UTC',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        waiting_room: true
      }
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/users/me/meetings`,
        meetingOptions,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Failed to create Zoom meeting: ${axiosError.message}`);
    }
  }

  async getMeeting(meetingId: string) {
    const token = await this.getAccessToken();
    
    try {
      const response = await axios.get(
        `${this.baseUrl}/meetings/${meetingId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Failed to get Zoom meeting: ${axiosError.message}`);
    }
  }

  async updateMeeting(meetingId: string, updateData: {
    topic?: string;
    startTime?: string;
    duration?: number;
    agenda?: string;
  }) {
    const token = await this.getAccessToken();
    
    try {
      const response = await axios.patch(
        `${this.baseUrl}/meetings/${meetingId}`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Failed to update Zoom meeting: ${axiosError.message}`);
    }
  }

  async deleteMeeting(meetingId: string) {
    const token = await this.getAccessToken();
    
    try {
      await axios.delete(
        `${this.baseUrl}/meetings/${meetingId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      return true;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(`Failed to delete Zoom meeting: ${axiosError.message}`);
    }
  }
}
