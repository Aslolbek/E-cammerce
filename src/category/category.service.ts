/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/shared/types/category';
import { Product } from 'src/shared/types/product';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModule: Model<Category>,
    @InjectModel('Product') private readonly productModule: Model<Product>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {

    const { name } = createCategoryDto;
    const newCategory = new this.categoryModule({
      name
    })

    await newCategory.save()
    return {
      message: 'This action adds a new category',
      newCategory: newCategory
    };
  }

  async findAll() {
    const categorys = await this.categoryModule.find();
    if(!categorys) {
      throw new NotFoundException('Categoryalar mavjud emas!')
    }

    return {
      mesage: 'Hamma categorylar yuborilmoqda',
      categorys: categorys
    };
  }

  async findOne(id: string) {

    const categoryProduct = await this.productModule.find({ categoryId: id });

    if(!categoryProduct) {
      throw new NotFoundException(" bu categoryda maxsulotlar yo'q")
    }
    return {
      message: 'Categorydagi maxsulotlar!',
      categoryProduct: categoryProduct
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.categoryModule.findByIdAndUpdate(
      id,
      updateCategoryDto, 
      { new: true } 
    );

    if (!updateCategory) {
      throw new NotFoundException(`Kategoriya topilmadi!`);
    }

    return {
      message: `Kategoriya muvaffaqiyatli yangilandi!`,
      category: updateCategory,
    };
}

async remove(id: string) {
  const deletedCategory = await this.categoryModule.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new NotFoundException(`Kategoriya topilmadi!`);
  }

  await this.productModule.deleteMany({ categoryId: id });

  return {
    message: `Kategoriya va unga tegishli mahsulotlar muvaffaqiyatli o‘chirildi!`,
    category: deletedCategory,
  };
}
}
