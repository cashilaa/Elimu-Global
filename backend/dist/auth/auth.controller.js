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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const instructor_schema_1 = require("../instructor/instructor.schema");
let AuthController = class AuthController {
    constructor(authService, instructorModel) {
        this.authService = authService;
        this.instructorModel = instructorModel;
    }
    async checkInstructor(email) {
        try {
            console.log('Checking instructor with email:', email);
            const instructor = await this.instructorModel.findOne({
                email: email.toLowerCase().trim()
            }).exec();
            console.log('Instructor found:', !!instructor);
            return {
                exists: !!instructor,
                email: email,
                found: instructor ? true : false
            };
        }
        catch (error) {
            console.error('Check instructor error:', error);
            throw new common_1.HttpException('Error checking instructor', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        try {
            console.log('Login request received:', body);
            if (!body.email || !body.password) {
                throw new common_1.HttpException('Email and password are required', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.authService.login(body.email, body.password);
            console.log('Login result:', result);
            return result;
        }
        catch (error) {
            console.error('Login error:', error);
            throw new common_1.HttpException((error === null || error === void 0 ? void 0 : error.message) || 'Login failed', (error === null || error === void 0 ? void 0 : error.status) || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)('check/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkInstructor", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('instructors'),
    __param(1, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        mongoose_2.Model])
], AuthController);
exports.AuthController = AuthController;
