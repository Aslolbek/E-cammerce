/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Post('create')
  create(@Body() createBasketDto: CreateBasketDto, @Request() req ) {
    return this.basketService.create(createBasketDto, req.user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Get()
  findAll(@Request() req) {
    return this.basketService.findAll(req.user);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.basketService.findOne(id, req.user);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto, @Request() req) {
    return this.basketService.update(id, updateBasketDto, req.user);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('user')
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Request() req) {
    return this.basketService.remove(id, req.user);
  }
}
