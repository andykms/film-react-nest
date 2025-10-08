import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, Length, IsNumber } from "@nestjs/class-validator";

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "float",
    precision: 2,
    scale: 1,
    default: 0,
    comment: "Film rating"
  })
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  @Length(1)
  director: string;
  
  @Column()
  @IsString({ each: true })
  tags: string[];

  @Column()
  @IsString()
  @Length(1)
  image: string;

  @Column()
  @IsString()
  @Length(1)
  cover: string;

  @Column()
  @IsString()
  @Length(1)
  title: string;

  @Column()
  @IsString()
  @Length(1)
  about: string;

  @Column()
  @IsString()
  @Length(1)
  description: string;
}