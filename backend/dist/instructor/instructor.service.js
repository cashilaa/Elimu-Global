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
exports.InstructorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let InstructorService = class InstructorService {
    constructor(instructorModel, courseModel, studentModel, sessionModel, resourceModel, notificationModel, analyticsModel) {
        this.instructorModel = instructorModel;
        this.courseModel = courseModel;
        this.studentModel = studentModel;
        this.sessionModel = sessionModel;
        this.resourceModel = resourceModel;
        this.notificationModel = notificationModel;
        this.analyticsModel = analyticsModel;
    }
    async findAll() {
        return this.instructorModel.find().exec();
    }
    async findOne(id) {
        return this.instructorModel.findById(id).exec();
    }
    async update(id, updateInstructorDto) {
        return this.instructorModel
            .findByIdAndUpdate(id, updateInstructorDto, { new: true })
            .exec();
    }
    async remove(id) {
        return this.instructorModel.findByIdAndDelete(id).exec();
    }
    async getInstructorStats(instructorId) {
        const instructor = await this.instructorModel
            .findById(instructorId)
            .populate('courses')
            .exec();
        if (!instructor) {
            throw new common_1.NotFoundException('Instructor not found');
        }
        // Fetch external platform stats
        const externalStats = await this.fetchExternalPlatformStats(instructor.email);
        return {
            activeCourses: instructor.courses.length,
            totalStudents: externalStats.totalStudents,
            upcomingSessions: externalStats.upcomingSessions,
            revenue: externalStats.revenue,
            recentActivities: externalStats.recentActivities
        };
    }
    async fetchExternalPlatformStats(instructorEmail) {
        try {
            // Replace with your external platform API endpoint
            const response = await fetch('https://api.externalplatform.com/instructor-stats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`
                },
                body: JSON.stringify({ instructorEmail })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch external stats');
            }
            return await response.json();
        }
        catch (error) {
            console.error('External API error:', error);
            // Return default values if external API fails
            return {
                totalStudents: 0,
                upcomingSessions: 0,
                revenue: 0,
                recentActivities: []
            };
        }
    }
    async getInstructorCourses(id) {
        return this.courseModel.find({ instructor: id }).exec();
    }
    async createCourse(id, courseData) {
        const course = new this.courseModel(Object.assign(Object.assign({}, courseData), { instructor: id }));
        return course.save();
    }
    async getStudents(id, courseId) {
        const query = courseId
            ? { enrolledCourses: courseId }
            : { enrolledCourses: { $in: await this.getInstructorCourses(id) } };
        return this.studentModel.find(query).exec();
    }
    async getAnalytics(id, startDate, endDate) {
        const query = { instructorId: id };
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        return this.analyticsModel.find(query).exec();
    }
    async getSessions(id, status) {
        const query = { instructor: id };
        if (status && status !== 'all') {
            query.status = status === 'upcoming' ? 'scheduled' : 'completed';
        }
        return this.sessionModel.find(query).exec();
    }
    async createSession(id, sessionData) {
        const session = new this.sessionModel(Object.assign(Object.assign({}, sessionData), { instructor: id }));
        return session.save();
    }
    async getResources(id) {
        return this.resourceModel.find({ uploadedBy: id }).exec();
    }
    async uploadResource(id, resourceData, file) {
        let fileData = null;
        if (file) {
            // Convert file to base64
            const base64String = file.buffer.toString('base64');
            const fileType = file.mimetype;
            fileData = {
                dataUrl: `data:${fileType};base64,${base64String}`,
                fileName: file.originalname,
                fileSize: file.size,
                mimeType: file.mimetype
            };
        }
        const resource = new this.resourceModel(Object.assign(Object.assign({}, resourceData), { uploadedBy: id, fileData: fileData, uploadedAt: new Date() }));
        return resource.save();
    }
    async getNotifications(id) {
        return this.notificationModel.find({ userId: id }).exec();
    }
    async markNotificationAsRead(id, notificationId) {
        return this.instructorModel.findByIdAndUpdate(id, {
            $set: { 'notifications.$[elem].read': true }
        }, {
            arrayFilters: [{ 'elem._id': new mongoose_2.Types.ObjectId(notificationId) }]
        });
    }
    async create(createInstructorDto) {
        const newInstructor = new this.instructorModel(createInstructorDto);
        return newInstructor.save();
    }
    async uploadProfilePicture(file) {
        // Convert file buffer to base64
        const base64String = file.buffer.toString('base64');
        const fileType = file.mimetype;
        // Return the data URL directly
        return `data:${fileType};base64,${base64String}`;
    }
};
InstructorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Instructor')),
    __param(1, (0, mongoose_1.InjectModel)('Course')),
    __param(2, (0, mongoose_1.InjectModel)('Student')),
    __param(3, (0, mongoose_1.InjectModel)('Session')),
    __param(4, (0, mongoose_1.InjectModel)('Resource')),
    __param(5, (0, mongoose_1.InjectModel)('Notification')),
    __param(6, (0, mongoose_1.InjectModel)('Analytics')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], InstructorService);
exports.InstructorService = InstructorService;
