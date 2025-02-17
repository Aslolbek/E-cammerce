/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsString()
        @IsNotEmpty()
        username?: string;
        
        @IsString()
        @IsNotEmpty()
        email?: string;
    
        @IsString()
        @IsNotEmpty()
        @MinLength(6)
        readonly password?: string;
    
        @IsString()
        @IsNotEmpty()
        region?: string;
    
        @IsString()
        @IsNotEmpty()
        district?: string;
}
