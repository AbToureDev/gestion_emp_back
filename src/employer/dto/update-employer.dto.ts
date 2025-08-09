import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateEmployerDto } from './create-employer.dto';
import {IsEmail, IsString} from "class-validator";

export class UpdateEmployerDto extends PartialType(CreateEmployerDto) {
    @ApiProperty({ default: 'Toure' })
    @IsString()
    firstName: string;

    @ApiProperty({ default: 'Toure' })
    @IsString()
    lastName: string;

    @ApiProperty({ default: 'Toure@gmail.com' })
    @IsEmail({}, { message: 'INVALID_EMAIL_FORMAT' })
    email: string;

    @ApiProperty({ default: 'Developper' })
    @IsString()
    poste: string;

    @ApiProperty({ default: '12/03/2025' })

    @IsString()
    Employed_date: string;
}
