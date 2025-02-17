/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateVendorDto extends PartialType(CreateVendorDto) {
    @IsOptional()
    @IsString()
    storeName?: string;

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password kamida 6 ta belgidan iborat bo‘lishi kerak' })
    password?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsNumber()
    balance?: number;
}
