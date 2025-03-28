import { ApiProperty, PartialType } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty({ description: 'текст', required: true })
  value: string;

  @ApiProperty({ description: 'cratedBy', required: true })
  cratedBy: number;
}

export class TodoUpdateDto extends PartialType(TodoDto) {
  @ApiProperty({ description: 'updatedBy', required: true })
  updatedBy: number;
}
