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

@Entity("searchor_types")
export default class SearchorType{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sort: number;

  @OneToMany(type => Searchor, searchor => searchor.type)
  @JoinColumn({ name: "id" })
  searchors: Searchor[]

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