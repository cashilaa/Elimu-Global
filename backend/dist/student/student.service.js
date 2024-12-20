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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let StudentService = class StudentService {
    constructor(studentModel) {
        this.studentModel = studentModel;
    }
    async findAll() {
        return this.studentModel.find().exec();
    }
    async findOne(id) {
        const student = await this.studentModel.findById(id).exec();
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }
    async create(createStudentDto) {
        const newStudent = new this.studentModel(createStudentDto);
        return newStudent.save();
    }
    async update(id, updateStudentDto) {
        const updatedStudent = await this.studentModel
            .findByIdAndUpdate(id, updateStudentDto, { new: true })
            .exec();
        if (!updatedStudent) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return updatedStudent;
    }
    async remove(id) {
        const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
        if (!deletedStudent) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return deletedStudent;
    }
    async enrollInCourse(studentId, courseId) {
        const student = await this.studentModel.findById(studentId);
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        if (!student.enrolledCourses.includes(new mongoose_2.Types.ObjectId(courseId))) {
            student.enrolledCourses.push(new mongoose_2.Types.ObjectId(courseId));
            return student.save();
        }
        return student;
    }
    async getEnrolledCourses(studentId) {
        return this.studentModel
            .findById(studentId)
            .populate('enrolledCourses')
            .exec();
    }
    async updateProgress(studentId, courseId, progress) {
        return this.studentModel.findOneAndUpdate({ _id: studentId, 'courses.courseId': courseId }, { $set: { 'courses.$.progress': progress } }, { new: true });
    }
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Student')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StudentService);
exports.StudentService = StudentService;
