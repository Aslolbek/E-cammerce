/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketDto } from './create-basket.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBasketDto extends PartialType(CreateBasketDto) {

    @IsString()
    @IsNotEmpty()
    productId?: string;

    
    @IsNumber()
    @IsNotEmpty()
    quantity?: number;
}
