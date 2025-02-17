/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Admin } from 'src/shared/types/admin';

@Injectable()
export class AdminService {

  constructor(@InjectModel('Admin') 
      private readonly adminModel: Model<Admin>,
      private readonly jwtService: JwtService) {}

  async adminRegister(createAdminDto: CreateAdminDto) {

    const { username, password }  = createAdminDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.adminModel({
      username,
      role: 'admin',
      password: hashedPassword,
    });

    await newAdmin.save();
    return { message: 'Admin yaratildi', admin: newAdmin};
  }

  async adminLogin(createAdminDto: CreateAdminDto) {

    const { username, password }  = createAdminDto;

    const admin = await this.adminModel.findOne({ username })
    
    if(!admin) {
      throw new NotFoundException(`Foydalanuvchi topilmadi!`);
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
              throw new UnauthorizedException('Parol noto‘g‘ri!');
            }
        const token =  this.jwtService.sign({ adminname: admin.username, sub: admin._id, role: admin.role });
    
        return { message: 'Muvaffaqiyatli tizimga kirdingiz!', token };
  }


  findAll() {
    return `This action returns all admin`;
  }


  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
