/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from 'src/shared/types/order';
import { User } from 'src/shared/types/user';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor( @InjectModel('Order')  private readonly orderModule: Model<Order> ) {}

  
  async create(createOrderDto: CreateOrderDto, user: User) {
    const userId = user._id
    const { totalPrice, products } = createOrderDto

    const newOrder = new this.orderModule({
      owner: userId,
      totalPrice,
      products
    })

    await newOrder.save()
    return { message: 'This action adds a new order', order: newOrder };
  }


  async findAll(user: User) {
    const orders = await this.orderModule.find({ owner: user._id })
    if(!orders) {
      throw new NotFoundException('Topilmadi')
    }
    return {
      message: 'Barcha buyurtmalaringiz',
      orders: orders
    }
  }

  async findOne(id: String, user: User) {
    const order = await this.orderModule.find({ _id:id, owner: user._id})
    if(!order) {
      throw new NotFoundException('Topilmadi')
    }
    return { message: `Mahsulotingiz`, order: order };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {

    const { status }= updateOrderDto;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    throw new BadRequestException('Noto‘g‘ri status qiymati');
  }

  const updatedOrder = await this.orderModule.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updatedOrder) {
    throw new NotFoundException('Buyurtma topilmadi');
  }

  return {
    message: 'Buyurtma statusi yangilandi!',
    order: updatedOrder,
  };
  }

  
  async remove(id: string) {
    const deletedOrder = await this.orderModule.findByIdAndDelete(id);

  if (!deletedOrder) {
    throw new NotFoundException('Buyurtma topilmadi');
  }

  return {
    message: 'Buyurtma muvaffaqiyatli o‘chirildi!',
    order: deletedOrder,
  };
  }
}
