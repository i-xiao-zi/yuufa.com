import {Injectable} from '@nestjs/common';
import YouNongPaiModelService from "./you_nong_pai.model";
import {instanceToPlain} from "class-transformer";
import dayjs from "dayjs";
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
import crypto from 'node:crypto';
import TvChannelModelService from './tv_channel.model';
// dayjs.extend(utc);
// dayjs.extend(timezone);

@Injectable()
export default class TvService {

  constructor(private readonly tvChannelModelService: TvChannelModelService) {}
  // //https://cmsres.dianzhenkeji.com/anonymous/2022/11/1/XRTVCgCFAA_700_700.png
  async henan() {
    let timestamp = dayjs().unix().toString();
    const sign = crypto.createHash('sha256').update(`6ca114a836ac7d73${timestamp}`).digest('hex')
    const response = await fetch(`https://pubmod.hntv.tv/program/getAuth/live/class/program/11/`, {
      headers: { sign, timestamp }
    })
    const channels = await response.json();
    // return channels;
    for (const channel of channels) {
      let start = dayjs(dayjs().format('YYYY-MM-DD')).unix().toString();
      const response = await fetch(`https://pubmod.hntv.tv/program/getAuth/vod/originStream/program/${channel.cid}/${start}`, {
        headers: { sign, timestamp }
      });
      const data = await response.json();
      channel.data = data;
    }
    return channels;
  }
}
