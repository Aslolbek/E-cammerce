/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/shared/types/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) {}

  

  async findAll() {
    const users = await this.userModel.find()
    return {users: users};
  }

  async findOne(id: number) {
    const user = await this.userModel.findById(id)
    return {user: user};
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  
      if (!updatedUser) {
        throw new NotFoundException(`Foydalanuvchi topilmadi!`);
      }
      return { message: "Foydalanuvchi yangilandi!", user: updatedUser };
    } catch (error) {
      throw new InternalServerErrorException("Foydalanuvchini yangilashda xatolik yuz berdi!");
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
  
      if (!deletedUser) {
        throw new NotFoundException(`Foydalanuvchi topilmadi!`);
      }
  
      return { message: "Foydalanuvchi o‘chirildi!", user: deletedUser };
    } catch (error) {
      throw new InternalServerErrorException("Foydalanuvchini o‘chirishda xatolik yuz berdi!");
    }
  }
}
