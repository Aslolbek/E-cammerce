/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
        @IsNotEmpty()
        title?: string;
    
        @IsString()
        @IsNotEmpty()
        description?: string;
    
        @IsString()
        @IsNotEmpty()
        image?: string;
    
    
        @IsNumber()
        @IsNotEmpty()
        price?: number;
    
        @IsNumber()
        @IsNotEmpty()
        amount?: number;
}
