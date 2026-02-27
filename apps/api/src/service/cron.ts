import {Injectable, NotFoundException} from '@nestjs/common';
import {hash} from "typeorm/util/StringUtils";
import {ConfigService} from "@nestjs/config";
import path from "path";
import UserModelService from "./user.model";

@Injectable()
export default class CronService {
  private readonly token: string;
  private readonly repo: string;
  private readonly owner: string;

  constructor(private readonly configService: ConfigService, private readonly userModelService: UserModelService) {
  }
  async youNongPai() {
    const body = new URLSearchParams();
    body.append('accessToken', '3998be25dc4d4cd7ac21f3ee1a9657d2');
    const response = await fetch('https://wcxapi.gxwcx.com/apiWxStore/v1.0/index/startDraw', {
      method: 'POST',
      headers: {
        'o': 'oUe5g7FGLV9frAZ_uYKandx_5V80',
        'apiFrom': 'WXMA',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c33)XWEB/13639',
        'accessToken': '3998be25dc4d4cd7ac21f3ee1a9657d2',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    console.log(response)
    return response.json();
  }
}
