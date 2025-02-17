/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
        @IsString()
        @IsNotEmpty()
      readonly username: string;

      @IsString()
        @IsNotEmpty()
          @MinLength(6)
      readonly password: string;
}
