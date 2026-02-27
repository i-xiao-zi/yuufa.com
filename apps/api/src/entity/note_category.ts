import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import {Exclude} from "class-transformer";
import NoteContent from './note_content';
import { ApiProperty } from '@nestjs/swagger';

@Entity("note_categories")
export default class NoteCategory {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  parent_id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  sort: number;

  @ApiProperty({type:[NoteContent]})
  @OneToMany(_ => NoteContent, noteContent => noteContent.category)
  @JoinColumn({ name: "id" })
  contents: NoteContent[]

  @ApiProperty({type:NoteCategory})
  @ManyToOne(_ => NoteCategory, noteCategory => noteCategory.children)
  @JoinColumn({ name: "parent_id" })
  parent: NoteCategory

  @ApiProperty({type:[NoteCategory]})
  @OneToMany(_ => NoteCategory, noteCategory => noteCategory.parent)
  @JoinColumn({ name: "id" })
  children: NoteCategory[]

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