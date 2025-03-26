import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TgContactDto {
  @IsNumber()
  userId: number;

  @IsString()
  phoneNumber: string;

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
