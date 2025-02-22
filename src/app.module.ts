/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { JwtGlobalModule } from './shared/jwt/jwt.module';
import { AdminModule } from './admin/admin.module';
import { VendorModule } from './vendor/vendor.module';
import { BasketModule } from './basket/basket.module';


@Module({
   
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
    JwtGlobalModule,
    ProductModule,
    UserModule,
    OrderModule,
    AuthModule,
    AdminModule,
    VendorModule,
    BasketModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtGlobalModule],
})
export class AppModule {}
