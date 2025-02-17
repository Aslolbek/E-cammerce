/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtGlobalModule } from 'src/shared/jwt/jwt.module';
import { AdminSchema } from 'src/shared/models/admin.schema';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
      JwtGlobalModule
    ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
