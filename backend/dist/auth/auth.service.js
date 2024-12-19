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
const instructor_schema_1 = require("../instructor/instructor.schema");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(instructorModel, jwtService) {
        this.instructorModel = instructorModel;
        this.jwtService = jwtService;
    }
    async signUp(createInstructorDto, file) {
        const uploadPath = path.join(__dirname, '..', 'uploads', file.originalname);
        fs.writeFileSync(uploadPath, file.buffer);
        createInstructorDto.cv = uploadPath;
        const createdInstructor = new this.instructorModel(createInstructorDto);
        return createdInstructor.save();
    }
    async login(email, password) {
        console.log('Login attempt:', { email, password }); // Log the incoming credentials
        const instructor = await this.instructorModel.findOne({ email }).exec();
        if (!instructor) {
            console.log('Instructor not found'); // Log if instructor is not found
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const instructorDoc = instructor;
        const isPasswordValid = await instructorDoc.validatePassword(password);
        if (!isPasswordValid) {
            console.log('Invalid password'); // Log if password is invalid
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateToken(instructorDoc);
        const _a = instructorDoc.toObject(), { password: _, validatePassword } = _a, instructorData = __rest(_a, ["password", "validatePassword"]);
        return {
            token,
            instructor: instructorData,
        };
    }
    generateToken(instructor) {
        const payload = {
            sub: instructor._id,
            email: instructor.email
        };
        return this.jwtService.sign(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
