import {Controller, Get} from '@nestjs/common';
import Json from '../decorator/json';
import Public from "../decorator/public";
import "multer";
import {ApiTags} from "@nestjs/swagger";
import CronService from '../service/cron';

@ApiTags("Cron")
@Controller('cron')
export default class CronController {
  constructor(private readonly cronService: CronService) {}

  @Json(false)
  @Get('you-nong-pai')
  @Public()
  youNongPai() {
    return this.cronService.youNongPai();
  }
}
