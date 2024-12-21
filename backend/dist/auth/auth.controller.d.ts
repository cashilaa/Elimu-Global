import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateInstructorDto } from '../instructor/dto/create-instructor.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createInstructorDto: CreateInstructorDto): Promise<{
        access_token: string;
        instructor: {
            id: unknown;
            email: string;
            role: string;
            firstName: string;
            lastName: string;
        };
    }>;
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
    checkInstructor(email: string): Promise<{
        exists: boolean;
        email: string;
    }>;
}
