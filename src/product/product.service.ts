/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-base-to-string */

import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/shared/types/product';
import { Vendor } from 'src/shared/types/vendor';
import { Comment } from 'src/shared/types/comment';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Comment') private readonly commentModel: Model<Comment>
      ) {}

 async create(createProductDto: CreateProductDto, user: Vendor, image: any ) {

    if(user.status == 'pending') {
      throw new ForbiddenException('Siz hali tasdiqlashdan o\'tmagansiz'); // sattus code 403
    }
    const { title, description, price, amount, categoryId } = createProductDto;

    const newProduct = new this.productModel({
      title,
      description,
      price,
      amount,
      image: image.path,
      owner: user._id,
      categoryId
    })

   await newProduct.save()
    return { 
      message: 'Mahsulot muvaffaqiyatli yaratildi!',
      product: newProduct
    };
  }

  // vendorga tegishli mahsulotlarni olib berish uchun
  async getVendorProducts(user: Vendor) {
    const products = await this.productModel.find({ owner: user._id });

    if(!products) {
      throw new NotFoundException('Topilmadi');
    }
    
    return { message: `Vendor yaratgan maxsulotlar!`, products: products };
  }

  // User barcha mahsulotlarni olib berish uchun
  async getAllProducts() {
    const products = await this.productModel.find().populate('owner').exec();
    if(!products) {
      throw new NotFoundException('Topilmadi');
    }
    return { 
      message: `Mavjud barcha mahsulotlar!`,
      products: products };
  }


  // Vendorga mahsulotni uzatish uchun
  async findVendorProduct(id: string, user: Vendor) {

    const product = await this.productModel.findById(id);

    if(!product) {
      throw new NotFoundException('Maxsulot mavjud emas!')
    }

    if(product.owner.toString() !== user._id.toString()) {
      throw new ForbiddenException('Siz bu mahsulotga kira olmaysiz')
    }

    return {
      message: 'Maxsulot olindi',
      product: product
    };
  }


  // Userga bitta maxsulotni korishi uchun

  async findUserProduct(id: string) {

    const product = await this.productModel.findById(id).populate('owner').exec();
    
    if(!product) {
      throw new NotFoundException('Topilmadi');
    }
    const comments = await this.commentModel.find({ productId: product._id })

    return {
      message: 'Maxsulot olindi',
      product: product,
      comments: Array.isArray(comments) && comments.length ? comments : 'Komment yo‘q'
    };
  }

 async update(id: string, updateProductDto: UpdateProductDto, user: Vendor) {

  const product = await this.productModel.findById(id);

  if (!product) {
    throw new NotFoundException(`Mahsulot topilmadi!`);
  }

  if (product.owner.toString() !== user._id.toString()) {
    throw new ForbiddenException(`Siz faqat o'zingiz yaratgan mahsulotni o'zgartira olasiz!`);
  }

  const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });

  return {
    message: `Mahsulot muvaffaqiyatli yangilandi!`,
    product: updatedProduct
  };
}


  async remove(id: string, user: Vendor) {

    const product = await this.productModel.findById(id);

  if (!product) {
    throw new NotFoundException(`Mahsulot topilmadi!`);
  }

  if (product.owner.toString() !== user._id.toString()) {
    throw new ForbiddenException(`Siz faqat o'zingiz yaratgan mahsulotni O'chira olasiz!`);
  }
  const deleteProduct = await this.productModel.findByIdAndDelete(id)

  await this.commentModel.deleteMany({ productId: product._id });
  return {
    message: `Mahsulot muvaffaqiyatli o'chirildi!`,
    product: deleteProduct
  };
  }
}
