/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  adminRegister(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.adminRegister(createAdminDto);
  }
  
  @Post('login')
  adminLogin(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.adminLogin(loginAdminDto);
  }

}
