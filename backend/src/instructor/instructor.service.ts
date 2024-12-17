import { Injectable, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Instructor, InstructorDocument } from './instructor.schema';
import { CreateInstructorDto } from './dto/create-instructor.dto';

type InstructorResponse = Omit<Instructor, 'password'>;

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(Instructor.name) private readonly instructorModel: Model<InstructorDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createInstructorDto: CreateInstructorDto): Promise<InstructorResponse> {
    // Check if instructor with email already exists
    const existingInstructor = await this.instructorModel.findOne({ 
      email: createInstructorDto.email 
    }).exec();

    if (existingInstructor) {
      throw new ConflictException('Email already registered');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createInstructorDto.password, salt);

    // Create the instructor
    const instructor = new this.instructorModel({
      ...createInstructorDto,
      password: hashedPassword,
      isVerified: true
    });

    // Save the instructor and convert to plain object
    const savedInstructor = await instructor.save();
    const plainInstructor = savedInstructor.toObject();
    
    // Remove sensitive data
    const { password, ...instructorData } = plainInstructor;
    
    return instructorData as InstructorResponse;
  }

  async login(email: string, password: string) {
    const instructor = await this.instructorModel.findOne({ email }).exec();
    
    if (!instructor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, instructor.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: instructor._id,
      email: instructor.email,
    };

    const token = this.jwtService.sign(payload);
    
    const { password: _, ...instructorData } = instructor.toObject();
    
    return {
      token,
      instructor: instructorData,
    };
  }

  async findAll(): Promise<InstructorResponse[]> {
    const instructors = await this.instructorModel
      .find()
      .select('-password')
      .lean()
      .exec();
    
    return instructors as InstructorResponse[];
  }

  async findByEmail(email: string): Promise<InstructorResponse | null> {
    const instructor = await this.instructorModel
      .findOne({ email })
      .select('-password')
      .lean()
      .exec();
    
    return instructor as InstructorResponse | null;
  }

  async verifyInstructor(id: string): Promise<InstructorResponse | null> {
    const instructor = await this.instructorModel.findById(id);
    if (!instructor) {
      throw new BadRequestException('Instructor not found');
    }

    instructor.isVerified = true;
    const updatedInstructor = await instructor.save();
    const plainInstructor = updatedInstructor.toObject();
    
    const { password, ...instructorData } = plainInstructor;
    return instructorData as InstructorResponse;
  }
}
