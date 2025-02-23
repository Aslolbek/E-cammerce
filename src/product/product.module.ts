/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/shared/models/product.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CommentSchema } from 'src/shared/models/comment.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema  },
      { name: 'Comment', schema: CommentSchema  },
    ]),
    AuthModule

  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
