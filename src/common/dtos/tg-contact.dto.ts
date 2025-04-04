import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TgContactDto {
  @IsNumber()
  telegramId: number;

  @IsString()
  phone: string;

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
}
