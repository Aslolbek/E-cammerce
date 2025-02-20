/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, Min, IsArray, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class OrderProductDto {
  @IsNotEmpty()
  @IsMongoId()
  product: string; 

  @IsNumber()
  @Min(1)
  quantity: number; 
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalPrice: number; // Umumiy narx

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[]; 
}
