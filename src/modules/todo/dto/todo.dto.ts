import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TodoDto {
  @ApiProperty({ description: 'текст' })
  @IsString()
  value: string;
}

export class TodoUpdateDto extends PartialType(TodoDto) {}
