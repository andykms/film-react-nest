//TODO описать DTO для запросов к /films

import {
  IsFQDN,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';

export class scheduleDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  daytime: string;
  @IsNumber()
  @IsNotEmpty()
  hall: number;
  @IsNumber()
  @IsNotEmpty()
  rows: number;
  @IsNumber()
  @IsNotEmpty()
  seats: number;
  @IsNumber()
  @IsNotEmpty()
  price: 350;
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  taken: string[];
}

export class filmDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsNumber()
  @IsNotEmpty()
  rating: number;
  @IsString()
  @IsNotEmpty()
  director: string;
  @IsArray()
  @IsNotEmpty()
  tags: string[];
  @IsFQDN()
  @IsNotEmpty()
  image: string;
  @IsFQDN()
  @IsNotEmpty()
  cover: string;
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  about: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsArray()
  @IsNotEmpty()
  schedule: scheduleDto[];
}
