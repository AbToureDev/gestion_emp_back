import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {admin} from "./entities/auth.entity";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([admin])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
