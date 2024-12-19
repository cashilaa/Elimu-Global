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
const jwt_1 = require("@nestjs/jwt");
const instructor_controller_1 = require("./instructor.controller");
const instructor_service_1 = require("./instructor.service");
const instructor_schema_1 = require("./instructor.schema");
const group_controller_1 = require("./group.controller");
const group_service_1 = require("./group.service");
const group_entity_1 = require("./entities/group.entity");
const group_schema_1 = require("./schemas/group.schema");
const notification_module_1 = require("../notification/notification.module");
const zoom_module_1 = require("../zoom/zoom.module");
// instructor.module.ts
let InstructorModule = class InstructorModule {
};
InstructorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: instructor_schema_1.Instructor.name, schema: instructor_schema_1.InstructorSchema },
                { name: group_entity_1.Group.name, schema: group_schema_1.GroupSchema },
            ]),
            jwt_1.JwtModule.register({}),
            notification_module_1.NotificationModule,
            zoom_module_1.ZoomModule,
        ],
        controllers: [instructor_controller_1.InstructorController, group_controller_1.GroupController],
        providers: [instructor_service_1.InstructorService, group_service_1.GroupService],
        exports: [instructor_service_1.InstructorService, group_service_1.GroupService],
    })
], InstructorModule);
exports.InstructorModule = InstructorModule;
