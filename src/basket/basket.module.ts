/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketSchema } from 'src/shared/models/basket.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Basket', schema: BasketSchema}]),
    AuthModule
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
