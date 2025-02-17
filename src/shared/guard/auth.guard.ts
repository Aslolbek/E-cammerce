/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new UnauthorizedException('Token mavjud emas!');
    }

    const token = authHeader.split(' ')[1];

    const validUser = await this.authService.verifyToken(token);

    if (!validUser) {
      throw new UnauthorizedException('Noto‘g‘ri token!');
    }

    request.user = validUser; 
    return true;
  }
}
