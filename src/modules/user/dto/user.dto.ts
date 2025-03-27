import { ApiProperty, PartialType } from '@nestjs/swagger';

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
    required: true,
    maxLength: 100,
    minLength: 1,
  })
  username: string;

  @ApiProperty({ required: true })
  telegramId: number;
}

export class UserUpdateDto extends PartialType(UserDto) {
  @ApiProperty({ required: false })
  avatar: string;
}
