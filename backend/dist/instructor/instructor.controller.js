"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const instructor_service_1 = require("./instructor.service");
const create_instructor_dto_1 = require("./dto/create-instructor.dto");
let InstructorController = class InstructorController {
    constructor(instructorService) {
        this.instructorService = instructorService;
    }
    async register(createInstructorDto, file) {
        try {
            // Parse JSON strings back to objects
            const parsedDto = Object.assign(Object.assign({}, createInstructorDto), { socialLinks: typeof createInstructorDto.socialLinks === 'string'
                    ? JSON.parse(createInstructorDto.socialLinks)
                    : createInstructorDto.socialLinks, teachingAreas: typeof createInstructorDto.teachingAreas === 'string'
                    ? JSON.parse(createInstructorDto.teachingAreas)
                    : createInstructorDto.teachingAreas });
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
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new common_1.BadRequestException('An unexpected error occurred during registration');
        }
    }
    async login({ email, password }) {
        try {
            const result = await this.instructorService.login(email, password);
            return Object.assign({ success: true }, result);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw new common_1.BadRequestException('An unexpected error occurred during login');
        }
    }
    async findAll() {
        const instructors = await this.instructorService.findAll();
        return {
            success: true,
            data: instructors
        };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/profiles',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, `${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            callback(null, true);
        },
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB
        }
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_instructor_dto_1.CreateInstructorDto, Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('findAll'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstructorController.prototype, "findAll", null);
InstructorController = __decorate([
    (0, common_1.Controller)('api/instructors'),
    __metadata("design:paramtypes", [instructor_service_1.InstructorService])
], InstructorController);
exports.InstructorController = InstructorController;
