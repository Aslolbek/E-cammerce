/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Vendor } from 'src/shared/types/vendor';
import { Model, ObjectId } from 'mongoose';
import { LoginVendorDto } from './dto/login-vendor.dto';

@Injectable()
export class VendorService {
  constructor(
      @InjectModel('Vendor') private readonly vendorModel: Model<Vendor>,
      private readonly jwtService: JwtService
  ) {}


 async vendorRegister(createVendorDto: CreateVendorDto) {
   const { storeName, username, email, password, phone, address, city } = createVendorDto;
   const vendor = await this.vendorModel.findOne({ email })
   if(!vendor) {
     const hashedPassword = await bcrypt.hash(password, 10);
   
     const newVendor = new this.vendorModel({
      storeName,
       username, 
       email,
       password: hashedPassword, 
       phone, 
       address, 
       city,  
       balance: 0,
        role: 'vendor'
     })
     await newVendor.save()
      return { message: 'Sotuvchi yaratildi', vendor: newVendor};
  }
  
  throw new BadRequestException(`${email} Email yordamida ro'yxatdan o'tilgan!`);
  }


  async vendorLogin (loginVendorDto: LoginVendorDto) {

    const { email, password } = loginVendorDto

    const vendor = await this.vendorModel.findOne({ email })

    if(!vendor){
      throw new NotFoundException('Vendor topilmadi!');
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);

        if (!isPasswordValid) {
          throw new UnauthorizedException('Parol noto‘g‘ri!');
        }
    const token =  this.jwtService.sign({ vendorname: vendor.username, sub: vendor._id, role: vendor.role });

    return { message: 'Muvaffaqiyatli tizimga kirdingiz!', token };


  }

  async vendorStatusUpdate(id, statusUpdate) {
  const { status } = statusUpdate;
  
    const allowedStatuses = ['pending', 'approved', 'rejected'];
    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException('Noto‘g‘ri status kiritildi');
    }
  
    const updatedVendor = await this.vendorModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    );
  
    if (!updatedVendor) {
      throw new NotFoundException('Vendor topilmadi');
    }
  
    return {
      message: 'Vendor statusi muvaffaqiyatli yangilandi!',
      vendor: updatedVendor,
    };
  }



  async findAll() {
    const vendors = await this.vendorModel.find()
    if(!vendors){
      throw new NotFoundException('Vendor topilmadi!');
    }
    return { message: `This action returns all vendor`, vendors: vendors};
  }

  async findOne(id: string) {
    const vendor = await this.vendorModel.findById(id)
    if(!vendor){
      throw new NotFoundException('Vendor topilmadi!');
    }

    return {message: `one vendor`, vendor: vendor};
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    const updatedVendor = await this.vendorModel.findByIdAndUpdate(
      id,
      { $set: updateVendorDto }, // Faqat kelgan ma'lumotlarni yangilaydi
      { new: true } // Yangilangan hujjatni qaytaradi
  );

  if (!updatedVendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
  }

  return updatedVendor;
  }

  async remove(id: string): Promise<{ message: string }> {

    const deletedVendor = await this.vendorModel.findByIdAndDelete(id);
    if (!deletedVendor) {
        throw new NotFoundException(`Vendor with ID ${id} not found`);
    }
    return { message: `Vendor with ID ${id} has been removed` };
}
}
