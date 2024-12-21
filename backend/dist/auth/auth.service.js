"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const instructor_schema_1 = require("../instructor/instructor.schema");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(instructorModel, jwtService) {
        this.instructorModel = instructorModel;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        try {
            // Find instructor and include password
            const instructor = await this.instructorModel
                .findOne({ email: loginDto.email.toLowerCase().trim() })
                .select('+password')
                .exec();
            if (!instructor) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            // Verify password
            const isPasswordValid = await bcrypt.compare(loginDto.password, instructor.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            // Generate JWT token
            const token = this.jwtService.sign({
                sub: instructor._id,
                email: instructor.email,
                role: 'instructor',
            });
            // Create response without password
            const response = {
                access_token: token,
                instructor: {
                    id: instructor._id,
                    email: instructor.email,
                    role: 'instructor',
                    firstName: instructor.firstName,
                    lastName: instructor.lastName,
                },
            };
            return response;
        }
        catch (error) {
            console.error('Login error:', error);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
    async findByEmail(email) {
        return this.instructorModel
            .findOne({ email: email.toLowerCase().trim() })
            .exec();
    }
    async register(createInstructorDto) {
        try {
            const existingInstructor = await this.findByEmail(createInstructorDto.email);
            if (existingInstructor) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            // Create new instructor
            const newInstructor = new this.instructorModel(Object.assign(Object.assign({}, createInstructorDto), { email: createInstructorDto.email.toLowerCase() }));
            // Password will be hashed by pre-save middleware
            const savedInstructor = await newInstructor.save();
            const token = this.jwtService.sign({
                sub: savedInstructor._id,
                email: savedInstructor.email,
                role: 'instructor',
            });
            // Create response without password
            const response = {
                access_token: token,
                instructor: {
                    id: savedInstructor._id,
                    email: savedInstructor.email,
                    role: 'instructor',
                    firstName: savedInstructor.firstName,
                    lastName: savedInstructor.lastName,
                },
            };
            return response;
        }
        catch (error) {
            console.error('Registration error:', error);
            throw new common_1.HttpException('Registration failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
