/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('vendor')
  @Post('create')
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productService.create(createProductDto, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('vendor')
  @Get('vendor/all')
  getVendorProducts(@Request() req) {
    return this.productService.getVendorProducts(req.user);
  }
  
  @Get('user/all')
  getAllProducts() {
    return this.productService.getAllProducts();
  }
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('vendor')
  @Get('vendor/product/:id')
  findVendorProduct(@Param('id') id: string, @Request() req) {
    return this.productService.findVendorProduct(id, req.user);
  }
  
  @Get('user/product/:id')
  findUserProduct(@Param('id') id: string) {
    return this.productService.findUserProduct(id);
  }
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('vendor')
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req) {
    return this.productService.update(id, updateProductDto, req.user);
  }

  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('vendor')
  @Delete('remove:id')
  remove(@Param('id') id: string, @Request() req) {
    return this.productService.remove(id, req.user);
  }
}
