/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { LoginVendorDto } from './dto/login-vendor.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RolesGuard } from 'src/shared/guard/roles.guard';
import { Roles } from 'src/shared/guard/roles.decorator';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('register')
  vendorRegister(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.vendorRegister(createVendorDto);
  }

  @Post('login')
  vendorLogin(@Body() loginVendorDto: LoginVendorDto) {
    return this.vendorService.vendorLogin(loginVendorDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('status/:id')
  vendorStatusUpdate(@Param('id') id: string, @Body() statusUpdate: {status: string}) {
    return this.vendorService.vendorStatusUpdate(id, statusUpdate)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('findAll')
  findAll() {
    return this.vendorService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(id, updateVendorDto);
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(id);
  }
}
