/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
  readonly username: string;

  @IsString()
    @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly region: string;

  @IsString()
  @IsNotEmpty()
  readonly district: string;
}
