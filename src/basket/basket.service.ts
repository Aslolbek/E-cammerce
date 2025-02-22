/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Basket } from 'src/shared/types/basket';
import { User } from 'src/shared/types/user';
import { CreateBasketDto } from './dto/create-basket.dto';
import { Model } from 'mongoose';

@Injectable()
export class BasketService {
  constructor(@InjectModel('Basket') private readonly basketModule: Model<Basket> ) {}

  async create(createBasketDto: CreateBasketDto, user: User) {


    const { productId, quantity } = createBasketDto;

    const basketProduct = await this.basketModule.findOne({ userId: user._id, productId: productId })

    if(!basketProduct) {

      const newBasket = new this.basketModule({
        userId: user._id,
        productId: productId,
        quantity
      })
  
      await newBasket.save()
  
      return {message: 'Savatga saqlandi', basket: newBasket};
    }

    return { message: 'Sizda savatda mavjud', basketProduct }

  }

  async findAll(user: User) {

    const basketProduct = await this.basketModule.find({ userId: user._id })

    if(!basketProduct) {
      throw new NotFoundException('Topilmadi');
    }
    return {
      message:`This action returns all basket`,
      basketProduct: basketProduct};
  }


  async findOne(id: string, user: User) {

    const basketProduct = await this.basketModule.findOne({ userId: user._id, _id: id })

    if(!basketProduct) {
      throw new NotFoundException('Topilmadi');
    }
    return {message: `This action returns a #${id} basket`, basketProduct: basketProduct};
  }


  async update(id: string, updateBasketDto: UpdateBasketDto, user: User) {

    const basketProduct = await this.basketModule.findById(id);

    if (!basketProduct) {
        throw new NotFoundException('Mahsulot topilmadi');
    }

    // 2️⃣ Foydalanuvchiga tegishli ekanligini tekshirish
    if (String(basketProduct.userId) !== String(user._id)) {
        throw new ForbiddenException('Siz bu mahsulotni yangilashga ruxsatingiz yo‘q');
    }

    // 3️⃣ Yangilash
    const updatedBasket = await this.basketModule.findByIdAndUpdate(id, updateBasketDto, { new: true });

    return {
        message: `Mahsulot (#${id}) savatda yangilandi`,
        updatedBasket
    };
  }


  async remove(id: string, user: User) {
    const basketProduct = await this.basketModule.findById(id);

    if (!basketProduct) {
        throw new NotFoundException('Mahsulot topilmadi');
    }

    if (String(basketProduct.userId) !== String(user._id)) {
      throw new ForbiddenException('Siz bu mahsulotni yangilashga ruxsatingiz yo‘q');
  }

  await this.basketModule.findByIdAndDelete(id);

    return { mesage:`This action removes a #${id} basket` };
  }
}
