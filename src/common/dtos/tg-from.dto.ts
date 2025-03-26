import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class TgFromDto {
  @IsNumber()
  id: number;

  @IsBoolean()
  isBot: boolean;

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
  @MinLength(2)
  languageCode: string;
}
