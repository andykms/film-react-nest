import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
  IsString,
  Length,
  IsNumber,
  IsNotEmpty,
  IsAlpha,
  IsArray,
} from '@nestjs/class-validator';
import { Shedule } from './shedule.entity';
import { ArrayUnique } from 'class-validator';

@Entity()
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('double precision')
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @Column()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  director: string;

  @Column('text', { array: true })
  @IsString({ each: true })
  @Length(1, 100)
  @IsArray()
  @ArrayUnique()
  tags: string[];

  @Column()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  image: string;

  @Column()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  cover: string;

  @Column()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  about: string;

  @Column()
  @IsString()
  @Length(1)
  @IsNotEmpty()
  description: string;

  @OneToMany(() => Shedule, (shedule) => shedule.film)
  shedules: Shedule[];
}
