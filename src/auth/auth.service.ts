import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {LoginAdminDto, registerDTO} from "./dto/login.admin.dto";
import {admin} from "./entities/auth.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import * as process from 'node:process';
export type Tokens = {
  access_token: string;
  refresh_token: string;
};


@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(admin)
      private readonly userRepository: Repository<admin>,
      private readonly jwtService: JwtService,
  ) {}
  async create(createAuthDto: registerDTO) {
    const extingAdmin = await this.userRepository.createQueryBuilder('admin')
        .where('admin.email = :email', { email: createAuthDto.email })
        .getOne();
    if (extingAdmin) {
      throw new ConflictException('Vous avez deja un compte.');
    }
    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 12);
    return await this.userRepository.save(createAuthDto);
  }

  async login(loginUserDto: LoginAdminDto) {
    const { password} = loginUserDto
    const user = await this.userRepository.createQueryBuilder('admin')
        .where('admin.email = :email', {email: loginUserDto.email})
        .getOne();
    if (!user) {
      throw new NotFoundException('User is not find');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('User password is not correct');
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return await this.getTokens(payload);
  }

  async getTokens(payload): Promise<Tokens> {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '5d',
        secret: process.env.REFRESH_SECRET,
      }),
    };
  }

}
