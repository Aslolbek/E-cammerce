/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/shared/models/order.schema';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
     MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema  }]),
     AuthModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
