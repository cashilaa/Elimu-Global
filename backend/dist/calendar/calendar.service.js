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
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const session_schema_1 = require("../session/session.schema");
const date_fns_1 = require("date-fns");
let CalendarService = class CalendarService {
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }
    async getInstructorSchedule(instructorId, date) {
        const weekStart = (0, date_fns_1.startOfWeek)(date);
        const weekEnd = (0, date_fns_1.endOfWeek)(date);
        return this.sessionModel.find({
            instructor: instructorId,
            startTime: { $gte: weekStart, $lte: weekEnd }
        }).populate('course', 'title')
            .populate('attendees', 'firstName lastName')
            .sort('startTime');
    }
    async createSession(sessionData) {
        const newSession = new this.sessionModel(sessionData);
        return newSession.save();
    }
    async updateSession(sessionId, updateData) {
        return this.sessionModel.findByIdAndUpdate(sessionId, updateData, { new: true });
    }
    async deleteSession(sessionId) {
        return this.sessionModel.findByIdAndDelete(sessionId);
    }
};
CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(session_schema_1.Session.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CalendarService);
exports.CalendarService = CalendarService;
