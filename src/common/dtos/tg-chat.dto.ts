import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TgChatDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  lastName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @IsString()
  type: string;
}
