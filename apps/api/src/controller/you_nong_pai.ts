import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import YouNongPaiService from '../service/you_nong_pai';

@ApiTags("优农派")
@Controller('you_nong_pai')
export default class YouNongPaiController {
  constructor(private readonly youNongPaiService: YouNongPaiService) {}

  @ApiOperation({summary: "上传文件"})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {type: 'string', example: 'a72a89cd4a2e4b2cbcd60a6c5e894e8f'}
      }
    }
  })
  @Post()
  @Public()
  index(@Body("token") token: string) {
    return this.youNongPaiService.index(token);
  }

  @ApiOperation({summary: "token列表"})
  @Public()
  @Get('tokens')
  tokens() {
    return this.youNongPaiService.tokens();
  }

  @ApiOperation({summary: '任务'})
  @Public()
  @Post('task')
  task() {

  }

  @ApiOperation({summary: '定时任务'})
  @Public()
  @Get('cron')
  cron() {
    return this.youNongPaiService.cron();
  }
}
