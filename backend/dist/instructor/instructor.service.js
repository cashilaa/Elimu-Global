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
exports.InstructorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const instructor_schema_1 = require("./instructor.schema");
let InstructorService = class InstructorService {
    constructor(instructorModel, jwtService) {
        this.instructorModel = instructorModel;
        this.jwtService = jwtService;
    }
    async register(createInstructorDto) {
        const existingInstructor = await this.instructorModel.findOne({
            email: createInstructorDto.email
        }).exec();
        if (existingInstructor) {
            throw new common_1.ConflictException('Email already registered');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createInstructorDto.password, salt);
        const instructor = new this.instructorModel(Object.assign(Object.assign({}, createInstructorDto), { password: hashedPassword, isVerified: true }));
        const savedInstructor = await instructor.save();
        const plainInstructor = savedInstructor.toObject();
        const { password, validatePassword } = plainInstructor, instructorData = __rest(plainInstructor, ["password", "validatePassword"]);
        return instructorData;
    }
    async login(email, password) {
        const instructor = await this.instructorModel.findOne({ email }).exec();
        if (!instructor) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, instructor.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: instructor._id,
            email: instructor.email,
        };
        const token = this.jwtService.sign(payload);
        const _a = instructor.toObject(), { password: _, validatePassword } = _a, instructorData = __rest(_a, ["password", "validatePassword"]);
        return {
            token,
            instructor: instructorData,
        };
    }
    async findAll() {
        const instructors = await this.instructorModel
            .find()
            .select('-password')
            .lean()
            .exec();
        return instructors;
    }
    async findByEmail(email) {
        const instructor = await this.instructorModel
            .findOne({ email })
            .select('-password')
            .lean()
            .exec();
        return instructor;
    }
    async verifyInstructor(id) {
        const instructor = await this.instructorModel.findById(id);
        if (!instructor) {
            throw new common_1.BadRequestException('Instructor not found');
        }
        instructor.isVerified = true;
        const updatedInstructor = await instructor.save();
        const plainInstructor = updatedInstructor.toObject();
        const { password, validatePassword } = plainInstructor, instructorData = __rest(plainInstructor, ["password", "validatePassword"]);
        return instructorData;
    }
};
InstructorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], InstructorService);
exports.InstructorService = InstructorService;
