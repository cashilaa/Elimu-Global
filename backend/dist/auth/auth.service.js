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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const instructor_schema_1 = require("../instructor/instructor.schema");
const instructor_service_1 = require("../instructor/instructor.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(instructorModel, jwtService, instructorService) {
        this.instructorModel = instructorModel;
        this.jwtService = jwtService;
        this.instructorService = instructorService;
    }
    async register(createInstructorDto, file) {
        const { email } = createInstructorDto;
        const existingInstructor = await this.instructorModel.findOne({ email: email.toLowerCase() });
        if (existingInstructor) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.instructorService.create(Object.assign(Object.assign({}, createInstructorDto), { email: email.toLowerCase(), profilePicture: file ? await this.instructorService.uploadProfilePicture(file) : null }));
    }
    async login(email, password) {
        try {
            console.log('Attempting to find instructor with email:', email);
            const instructor = await this.instructorModel.findOne({
                email: email.toLowerCase()
            }).select('+password');
            if (!instructor) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            console.log('Instructor found, verifying password');
            const isPasswordValid = await bcrypt.compare(password, instructor.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            console.log('Password verified, generating token');
            const token = this.jwtService.sign({
                id: instructor._id,
                email: instructor.email
            });
            const instructorData = instructor.toObject();
            const { password: _ } = instructorData, rest = __rest(instructorData, ["password"]);
            return {
                success: true,
                token,
                instructor: rest
            };
        }
        catch (error) {
            console.error('Login service error:', error);
            throw new common_1.HttpException((error === null || error === void 0 ? void 0 : error.message) || 'An error occurred during login', (error === null || error === void 0 ? void 0 : error.status) || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        instructor_service_1.InstructorService])
], AuthService);
exports.AuthService = AuthService;
