//TODO реализовать DTO для /orders
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayMinSize,
  IsEmail,
  ValidateNested,
  IsPhoneNumber,
  IsDateString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class orderFilmDto {
  @IsString()
  @IsNotEmpty()
  film: string;
  @IsString()
  @IsNotEmpty()
  session: string;
  @IsDateString({ strict: true })
  @Matches(
    /[0-9]{4}-[0-9]{2}-[0-9]{2}[A-Z]{1}[0-9]{2}:[0-9]{2}:[0-9]{2}\+[0-9]{2}:[0-9]{2}/,
  )
  @IsNotEmpty()
  daytime: string;
  @IsString()
  @IsNotEmpty()
  day: string;
  @IsString()
  @IsNotEmpty()
  time: string;
  @IsNumber()
  @IsNotEmpty()
  row: number;
  @IsNumber()
  @IsNotEmpty()
  seat: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class orderDto {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => orderFilmDto)
  tickets: orderFilmDto[];
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;
}
