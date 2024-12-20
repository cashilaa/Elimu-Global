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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const course_schema_1 = require("./course.schema");
let CourseService = class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async create(createCourseDto) {
        const createdCourse = new this.courseModel(Object.assign(Object.assign({}, createCourseDto), { instructor: new mongoose_2.Types.ObjectId(createCourseDto.instructor), status: 'draft', students: [], reviews: [], analytics: {
                enrollments: 0,
                averageRating: 0,
                activeStudents: 0,
                revenue: 0
            } }));
        return createdCourse.save();
    }
    async findAll(filter = {}) {
        return this.courseModel.find(filter).exec();
    }
    async findOne(id) {
        const course = await this.courseModel.findById(id).exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }
    async findByInstructor(instructorId) {
        return this.courseModel.find({ instructor: instructorId }).exec();
    }
    async update(id, updateCourseDto) {
        if (updateCourseDto.instructor) {
            updateCourseDto.instructor = new mongoose_2.Types.ObjectId(updateCourseDto.instructor);
        }
        const updatedCourse = await this.courseModel
            .findByIdAndUpdate(id, updateCourseDto, { new: true })
            .exec();
        if (!updatedCourse) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return updatedCourse;
    }
    async updateStatus(id, status) {
        const course = await this.courseModel
            .findByIdAndUpdate(id, Object.assign({ status }, (status === 'published' ? { publishedAt: new Date() } : {})), { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }
    async addStudent(courseId, studentId) {
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, { $addToSet: { students: studentId } }, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        return course;
    }
    async addReview(courseId, studentId, rating, comment) {
        const course = await this.courseModel
            .findByIdAndUpdate(courseId, {
            $push: {
                reviews: {
                    student: new mongoose_2.Types.ObjectId(studentId),
                    rating,
                    comment,
                    createdAt: new Date(),
                },
            },
        }, { new: true })
            .exec();
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        return course;
    }
    async updateAnalytics(courseId) {
        var _a;
        const course = await this.findOne(courseId);
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        const averageRating = await this.calculateAverageRating(course);
        const analytics = {
            enrollments: course.students.length,
            averageRating,
            activeStudents: course.students.length,
            revenue: course.students.length * (((_a = course.pricing) === null || _a === void 0 ? void 0 : _a.amount) || 0),
        };
        const updatedCourse = await this.courseModel
            .findByIdAndUpdate(courseId, { 'analytics': analytics }, { new: true })
            .exec();
        if (!updatedCourse) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
        }
        return updatedCourse;
    }
    async delete(id) {
        const deletedCourse = await this.courseModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedCourse) {
            throw new common_1.NotFoundException(`Course with ID ${id} not found`);
        }
        return deletedCourse;
    }
    async calculateAverageRating(course) {
        var _a;
        if (!((_a = course.reviews) === null || _a === void 0 ? void 0 : _a.length))
            return 0;
        return course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length;
    }
    async getUserCourses(userId) {
        return this.courseModel.find({
            $or: [
                { instructor: userId },
                { students: userId }
            ]
        }).exec();
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CourseService);
exports.CourseService = CourseService;
