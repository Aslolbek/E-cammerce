/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional, IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class CreateVendorDto {
    @IsString()
    @IsNotEmpty()
    storeName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password kamida 6 ta belgidan iborat bo‘lishi kerak' })
    password: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsOptional() // Optional, default = 0
    balance?: number;

    

    @IsString()
    @IsIn(['pending', 'approved', 'blocked']) // Enum qiymatlar
    @IsOptional() // Optional, default = 'pending'
    status?: 'pending' | 'approved' | 'blocked';
}
