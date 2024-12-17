import { Controller, Post, Body, HttpStatus, HttpCode, BadRequestException, UseInterceptors, UploadedFile, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';

@Controller('api/instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('profilePicture', {
    storage: diskStorage({
      destination: './uploads/profiles',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB
    }
  }))
  async register(
    @Body() createInstructorDto: CreateInstructorDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    try {
      // Parse JSON strings back to objects
      const parsedDto = {
        ...createInstructorDto,
        socialLinks: typeof createInstructorDto.socialLinks === 'string' 
          ? JSON.parse(createInstructorDto.socialLinks)
          : createInstructorDto.socialLinks,
        teachingAreas: typeof createInstructorDto.teachingAreas === 'string'
          ? JSON.parse(createInstructorDto.teachingAreas)
          : createInstructorDto.teachingAreas
      };

      // Add profile picture path if file was uploaded
      if (file) {
        parsedDto.profilePicture = `/uploads/profiles/${file.filename}`;
      }

      const instructor = await this.instructorService.register(parsedDto);
      
      return {
        success: true,
        message: 'Registration successful!',
        data: instructor
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unexpected error occurred during registration');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: { email: string; password: string }) {
    try {
      const result = await this.instructorService.login(email, password);
      return {
        success: true,
        ...result
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      }
      throw new BadRequestException('An unexpected error occurred during login');
    }
  }

  @Post('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const instructors = await this.instructorService.findAll();
    return {
      success: true,
      data: instructors
    };
  }
}
