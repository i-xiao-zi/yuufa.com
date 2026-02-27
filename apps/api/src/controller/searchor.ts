import {Controller, Request, Get, Post, UseGuards, Body} from '@nestjs/common';
import AppService from '../service/app';
import Public from "../decorator/public";
import SearchorService from "../service/searchor";
import { Register } from "../validator/auth";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags("搜索引擎")
@Controller('searchor')
export default class SearchorController {
  constructor(private readonly searchorService: SearchorService) {}

  @ApiOperation({
    summary: "列表",
    description: '列表'
  })
  @Public()
  @Get()
  public index() {
    return this.searchorService.index();
  }
}
