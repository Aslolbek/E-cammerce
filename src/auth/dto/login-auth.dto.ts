/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;
}
