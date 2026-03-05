import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, OneToMany, JoinColumn
} from 'typeorm';
import Searchor from "./searchor";
import {Exclude} from "class-transformer";

@Entity("you_nong_pais")
export default class YouNongPai{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  token: string;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}