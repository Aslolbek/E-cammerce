/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/shared/types/user';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/shared/types/admin';
import { Vendor } from 'src/shared/types/vendor';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('Vendor') private readonly vendorModel: Model<Vendor>,
    private readonly jwtService: JwtService
) {}

async verifyToken(token: string) {
  try {
    const decoded = this.jwtService.verify(token); 
    let user = null;

    // User tekshiruvi
    if (decoded.role === 'user') {
      user = await this.userModel.findById(decoded.sub);
    }

    // Admin tekshiruvi
    if (decoded.role === 'admin') {
      user = await this.adminModel.findById(decoded.sub);
    }

    // Vendor tekshiruvi
    if (decoded.role === 'vendor') {
      user = await this.vendorModel.findById(decoded.sub);
    }

    // Agar foydalanuvchi topilmasa, xatolik qaytadi
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi');
    }
    return user;  
  } catch (error) {
    throw new UnauthorizedException('Tokenni tekshirishda xato!');
  }
}

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
    const token = this.jwtService.sign({ username: user.username, sub: user._id, role: user.role });


    return { message: 'Muvaffaqiyatli tizimga kirdingiz!', token };
  }

 
}
