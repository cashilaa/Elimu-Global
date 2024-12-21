import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InstructorDocument } from '../instructor/instructor.schema';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private instructorModel;
    private jwtService;
    constructor(instructorModel: Model<InstructorDocument>, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        instructor: {
            id: unknown;
            email: string;
            role: string;
            firstName: string;
            lastName: string;
        };
    }>;
    findByEmail(email: string): Promise<InstructorDocument | null>;
    register(createInstructorDto: any): Promise<{
        access_token: string;
        instructor: {
            id: unknown;
            email: string;
            role: string;
            firstName: string;
            lastName: string;
        };
    }>;
}
