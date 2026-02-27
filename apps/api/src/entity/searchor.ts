import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne, JoinColumn
} from 'typeorm';
import SearchorType from "./searchor_type";
import {Exclude} from "class-transformer";

@Entity("searchors")
export default class Searchor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  icon: string;

  @Column()
  sort: number;

  @ManyToOne(_ => SearchorType, searchorType => searchorType.id)
  @JoinColumn({ name: "type" })
  type: SearchorType

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