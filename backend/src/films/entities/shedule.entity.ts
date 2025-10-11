import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from './film.entity';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from '@nestjs/class-validator';
import { ArrayUnique } from 'class-validator';

@Entity()
export class Shedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(10, 100)
  @IsNotEmpty()
  @IsString()
  daytime: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  hall: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  rows: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  seats: number;

  @Column('double precision')
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column('text', { array: true })
  @IsArray()
  @ArrayUnique()
  taken: string[];

  @ManyToOne(() => Film, (film) => film.shedules)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
