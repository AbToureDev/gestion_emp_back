import { IsEmail, IsNotEmpty,  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginAdminDto {
    @IsEmail({}, { message: 'INVALID_EMAIL_FORMAT' })
    @ApiProperty()
    email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    password: string;
}

export class registerDTO {
    @IsEmail({}, { message: 'INVALID_EMAIL_FORMAT' })
    @ApiProperty()
    email: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    password: string;
}