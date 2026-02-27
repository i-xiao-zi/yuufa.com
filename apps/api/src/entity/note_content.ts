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
import NoteCategory from './note_category';
import { ApiProperty } from '@nestjs/swagger';

@Entity("note_contents")
export default class NoteContent {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  category_id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  sort: number;

  @ManyToOne(_ => NoteCategory, noteCategory => noteCategory.contents)
  @JoinColumn({ name: "category_id" })
  category: NoteCategory;

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