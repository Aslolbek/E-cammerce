/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  verifyToken: any;
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
) {}

  async register(createAuthDto: CreateAuthDto)  {
    const { username, email, password, region, district } = createAuthDto;

    const user = await this.userModel.findOne({ email })
    if(!user) {

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new this.userModel({
        username,
        role: 'user',
        email,
        password: hashedPassword,
        region,
        district,
      });

      await newUser.save();
  
      return { message: 'Foydalanuvchi ro‘yxatdan o‘tdi!', user: newUser };
    } else {
      
      return { message: `${email} Bu email yordamida ro'yxatdan o'tilgan!`};
    }

    }

  async login(loginAuthDto: LoginAuthDto) {
    
    const { email, password } = loginAuthDto;

    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi!');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Parol noto‘g‘ri!');
    }
    const token = this.jwtService.sign({ username: user.username, sub: user.id, role: user.role });


    return { message: 'Muvaffaqiyatli tizimga kirdingiz!', token };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
