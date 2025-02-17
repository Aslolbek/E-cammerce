/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { JwtGlobalModule } from 'src/shared/jwt/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VendorSchema } from 'src/shared/models/vendor.schema';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[ 
  ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
        JwtGlobalModule,
        AuthModule
  ],
  controllers: [VendorController],
  providers: [VendorService, AuthGuard],
})
export class VendorModule {}
