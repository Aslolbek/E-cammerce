/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    
    @IsString()
    @IsNotEmpty()
    @IsIn(['active', 'pending', 'rejected'], {
        message: 'Status faqat active, pending yoki rejected bo‘lishi mumkin!',
      })
    status?: string
}
