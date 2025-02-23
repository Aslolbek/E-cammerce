/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/shared/models/comment.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ProductSchema } from 'src/shared/models/product.schema';
import { BasketSchema } from 'src/shared/models/basket.schema';

@Module({
  imports: [
    MongooseModule.forFeature( [
      { name: 'Comment', schema: CommentSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Basket', schema: BasketSchema },
  ]),
    AuthModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
