"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const instructor_schema_1 = require("../instructor/instructor.schema");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: instructor_schema_1.Instructor.name, schema: instructor_schema_1.InstructorSchema }]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: 'e4d5f3h2j7k8m9p1q4w8x5c6v7b3n9m2',
                    signOptions: {
                        expiresIn: '24h' // Increased token expiration time
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
