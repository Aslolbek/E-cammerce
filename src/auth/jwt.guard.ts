/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       throw new UnauthorizedException('Token yo‘q!');
//     }

//     try {
//       const token = authHeader.split(' ')[1];
//       request.user = this.jwtService.verify(token); // ✅ Tokenni tekshiramiz
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Noto‘g‘ri token!');
//     }
//   }
// }
