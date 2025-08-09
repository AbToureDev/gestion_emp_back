import { Controller,  Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import {LoginAdminDto, registerDTO} from "./dto/login.admin.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: LoginAdminDto) {
    return this.authService.login(createAuthDto);
  }
  @Post('register')
  create(@Body() createAuthDto: registerDTO) {
    return this.authService.create(createAuthDto);
  }

}
