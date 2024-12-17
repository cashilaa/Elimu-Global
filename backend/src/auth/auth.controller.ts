import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateInstructorDto } from '../instructor/create-instructor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('cv'))
  async signUp(@Body() createInstructorDto: CreateInstructorDto, @UploadedFile() file: Express.Multer.File) {
    return this.authService.signUp(createInstructorDto, file);
  }
}
