/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/shared/types/user';
import { Model } from 'mongoose';
import { Comment } from 'src/shared/types/comment';
import { Product } from 'src/shared/types/product';
import { Basket } from 'src/shared/types/basket';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
   @InjectModel('Comment') private readonly commentModule: Model<Comment>,
   @InjectModel('Product') private readonly productModule: Model<Product>,
   @InjectModel('Basket') private readonly basketModule: Model<Basket>,
  ){}

  async create(createCommentDto: CreateCommentDto, user: User) {
    const { productId, comment } = createCommentDto;

    const product = await this.basketModule.findOne({ userId: user._id, productId: productId })

    if(!product) {
      throw new NotFoundException('Fikir bildira olmaysiz!')
    }

    if(product.status != 'canceled') {
      throw new NotFoundException('Fikir qoldira olmaysiz!')
    }

    const newComment = new this.commentModule({
      userId: user._id,
      productId: productId,
      comment
    })

    await newComment.save()
    return {message: 'This action adds a new comment', comment: newComment};
  }


  async findAll() {
    const comments = await this.commentModule.find().populate('userId').exec()
    return {
      message: `This action returns all comments`,
      comment: comments ?? 'comennt ar yo\'q'};
  }

  async findOne(id: string) {
    const comment = await this.commentModule.findById(id).populate('userId').exec();
    if(!comment) {
      throw new NotFoundException(`ID ${id} bo‘yicha ma'lumot topilmadi.`)
    }
    return { message: `This action returns a #${id} comment`, comment: comment };
  }


  async update(id: string, updateCommentDto: UpdateCommentDto) {

    const { status } = updateCommentDto;

        const existingComment = await this.commentModule.findById(id);
        if (!existingComment) {
            throw new NotFoundException(`Komment topilmadi!`);
        }

        const updatedComment = await this.commentModule.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );

        return {
            message: `Komment muvaffaqiyatli yangilandi!`,
            updatedComment
        };
  }


  async remove(id: string) {
    const deleteComment = await this.commentModule.findByIdAndDelete(id)
    return {
      message: `This action removes a #${id} comment`,
      comment: deleteComment
  };
  }
}
