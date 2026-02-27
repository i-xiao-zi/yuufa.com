import { Injectable } from '@nestjs/common';
import NoteContentModelService from "./note_content.model";
import NoteCategoryModelService from './note_category.model';
import { instanceToPlain } from 'class-transformer';
import { CreateNoteContent, UpdateNoteContent } from 'src/validator/note';

@Injectable()
export default class NoteService {
  constructor(private readonly noteCategoryModelService: NoteCategoryModelService, private readonly noteContentModelService: NoteContentModelService) {}
  index() {
    return instanceToPlain(this.children(0));
  }
  findContent(id: number) {
    return instanceToPlain(this.noteContentModelService.find(id));
  }
  createContent(data: CreateNoteContent) {
    return instanceToPlain(this.noteContentModelService.save(data));
  }
  updateContent(id: number, data: UpdateNoteContent) {
    return instanceToPlain(this.noteContentModelService.save({...data, id}));
  }
  private async children(parent_id: number) {
    const items = await this.noteCategoryModelService.allByParentId(parent_id);
    for (let item of items) {
      item.children = await this.children(item.id);
    }
    return items;
  }
}
