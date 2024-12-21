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
exports.CourseGenerationController = void 0;
const common_1 = require("@nestjs/common");
const gemini_service_1 = require("../services/gemini.service");
let CourseGenerationController = class CourseGenerationController {
    constructor(geminiService) {
        this.geminiService = geminiService;
    }
    async generateCourse(body) {
        try {
            const { message, context } = body;
            if (!context || !Array.isArray(context)) {
                throw new Error('Invalid context format');
            }
            const stage = this.geminiService.determineStage(context);
            const response = await this.geminiService.generateResponse(message, stage);
            if (stage === 'final') {
                const courseData = await this.geminiService.generateCourseStructure(context);
                return {
                    message: "I've generated your course structure! You can now review and customize it.",
                    courseData
                };
            }
            return { message: response };
        }
        catch (error) {
            console.error('Course generation error:', error);
            throw error;
        }
    }
};
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseGenerationController.prototype, "generateCourse", null);
CourseGenerationController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], CourseGenerationController);
exports.CourseGenerationController = CourseGenerationController;
//# sourceMappingURL=course-generation.controller.js.map