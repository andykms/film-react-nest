//TODO реализовать DTO для /orders
import {
  IsFQDN,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

class orderFilmDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  film: string;
  @IsString()
  @IsNotEmpty()
  session: string;
  @IsString()
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
  @IsString({ each: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
  items: orderFilmDto[];
  @IsNotEmpty()
  @IsNumber()
  total: number;
}
