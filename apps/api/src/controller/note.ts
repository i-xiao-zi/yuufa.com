import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import Public from "../decorator/public";
import "multer";
import { ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import NoteService from '../service/note';
import NoteCategory from '../entity/note_category';
import {CreateNoteContent, UpdateNoteContent} from '../validator/note';
import NoteContent from 'src/entity/note_content';

@ApiTags("笔记")
@Controller("note")
export default class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiOperation({summary: "获取笔记列表"})
  @ApiResponse({type: [NoteCategory]})
  @Get()
  @Public()
  index() {
    return this.noteService.index();
  }

  @ApiOperation({summary: "通过 ID 获取笔记"})
  @ApiResponse({type: NoteContent})
  @Get("content/:id")
  @Public()
  findContent(@Param("id") id: number) {
    return this.noteService.findContent(id);
  }

  @ApiOperation({summary: "添加笔记"})
  @ApiResponse({type: NoteContent})
  @Post("content")
  @Public()
  createContent( @Body() data: CreateNoteContent) {
    return this.noteService.createContent(data);
  }

  @ApiOperation({summary: "通过 ID 添加笔记"})
  @ApiResponse({type: NoteContent})
  @Post("content/:id")
  @Public()
  updateContent( @Param("id") id: number, @Body() data: UpdateNoteContent) {
    return this.noteService.updateContent(id, data);
  }
}
