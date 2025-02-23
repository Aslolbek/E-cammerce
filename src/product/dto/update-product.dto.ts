/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsString } from 'class-validator';

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
    
    
        @IsString()
        @IsNotEmpty()
        price?: string;
    
        @IsString()
        @IsNotEmpty()
        amount?: string;

        @IsString()
        @IsNotEmpty()
        categoryId?: string;
}
