/* eslint-disable prettier/prettier */
import { Controller, Get,  Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

 

  @UseGuards(AuthGuard, RolesGuard) //token tekshirish uchun
  @Roles('admin') // role ni tekshirish uchun 
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('update:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
