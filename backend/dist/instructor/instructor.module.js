"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const instructor_controller_1 = require("./instructor.controller");
const instructor_service_1 = require("./instructor.service");
const course_schema_1 = require("../course/course.schema");
const student_schema_1 = require("../student/student.schema");
const session_schema_1 = require("../session/session.schema");
const analytics_schema_1 = require("../analytics/analytics.schema");
const resource_schema_1 = require("../shared/schemas/resource.schema");
const notification_schema_1 = require("../shared/schemas/notification.schema");
const config_1 = require("@nestjs/config");
const shared_module_1 = require("../shared/shared.module");
const auth_module_1 = require("../auth/auth.module");
let InstructorModule = class InstructorModule {
};
InstructorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            shared_module_1.SharedModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            mongoose_1.MongooseModule.forFeature([
                { name: course_schema_1.Course.name, schema: course_schema_1.CourseSchema },
                { name: student_schema_1.Student.name, schema: student_schema_1.StudentSchema },
                { name: session_schema_1.Session.name, schema: session_schema_1.SessionSchema },
                { name: analytics_schema_1.Analytics.name, schema: analytics_schema_1.AnalyticsSchema },
                { name: resource_schema_1.Resource.name, schema: resource_schema_1.ResourceSchema },
                { name: notification_schema_1.Notification.name, schema: notification_schema_1.NotificationSchema },
            ]),
            config_1.ConfigModule,
        ],
        controllers: [instructor_controller_1.InstructorController],
        providers: [instructor_service_1.InstructorService],
        exports: [instructor_service_1.InstructorService],
    })
], InstructorModule);
exports.InstructorModule = InstructorModule;
