import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    required: false,
    maxLength: 100,
    minLength: 1,
  })
  lastName?: string;

  @ApiProperty({
    required: false,
    maxLength: 100,
    minLength: 1,
  })
  firstName?: string;

  @ApiProperty({
    required: false,
    maxLength: 100,
    minLength: 1,
  })
  userName: string;

  @ApiProperty({ required: true })
  telegramId: number;

  @ApiProperty({ required: true, default: 1 })
  status: number;
}

export class UserQueryDto {}

export class UserUpdateDto {}
