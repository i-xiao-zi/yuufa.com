import {Injectable} from '@nestjs/common';
import YouNongPaiModelService from "./you_nong_pai.model";
import {instanceToPlain} from "class-transformer";
import dayjs from "dayjs";
import qs from 'qs';

@Injectable()
export default class YouNongPaiService {

  constructor(private readonly youNongPaiModelService: YouNongPaiModelService) {}
  async index(token) {
    return {
      user: await this.userInfo(token),
      draw_info: await this.findUserBalance(token),
      draw_logs: await this.findMoneyLogs(token),
      growth_info: await this.growthInfo(token),
      growth_logs: await this.growthLogs(token),
      tasks: await this.growthTask(token),
    };
  }
  tokens() {
    return instanceToPlain(this.youNongPaiModelService.all());
  }
  async cron() {
    const ynps = await this.youNongPaiModelService.all()
    let res = {};
    for (const {token, name} of ynps) {
      const tasks = await this.growthTask(token);
      for(const task of tasks) {
        if (task.isFinish === 0) {
          switch(task.taskType) {
            case 'TASK_GET_BT': // 领取惠民补贴
              res[name]['draw'] = await this.startDraw(token);
              break;
            case 'TASK_SIGN': // 今日签到
              res[name]['sign'] = await this.growthSignIn(token);
              break;
            case 'TASK_SHARE':// 分享助农好货
              res[name]['share'] = await this.growthShareProduct(token);
              break;
            case 'TASK_MALL':// 逛逛助农商城得成长值
              res[name]['view'] = await this.growthViewSign(token);
              break;
          }
        }
      }
    }
    return res;
  }
  async task(token: string, name: string) {
    if(name == 'draw') {
      return await this.startDraw(token);
    } else if (name == 'view') {
      return await this.view(token);
    } else if (name == 'sign') {
      return await this.growthSignIn(token);
    } else if (name == 'share') {
      return await this.growthShareProduct(token);
    }
  }

  /**
   * 抽奖
   */
  startDraw(token: string) {
    return this.fetch('/index/startDraw', {accessToken: token});
  }
  view(token: string) {
    return this.fetch('/growth/viewMallSign', {productMainId: 92, accessToken: token})
  }

  /**
   * 抽奖状态
   * @param token
   */
  getDrawIndex(token: string) {
    return this.fetch('/index/getDrawIndex', {accessToken: token});
  }
  findUserBalance(token: string) {
    return this.fetch('/getCash/findUserBalance', {accessToken: token});
  }
  userInfo(token: string) {
    return this.fetch('/account/findUserInfo', {accessToken: token});
  }
  findMoneyLogs(token: string){
    let data = {
      page: 1,
      type: 1,
      startDay: '20260101',
      endDay: dayjs().format('YYYYMMDD'),
      pageSize: 1000,
      accessToken: token
    }
    return this.fetch('/getCash/findMoneyLogs', data);
  }
  freeIndex(token) {
    return this.fetch('/index/free/index', {accessToken: token});
  }
  // 成长信息
  growthInfo(token) {
    return this.fetch('/growth/findUserGrowthInfo', {
      accessToken: token,
    });
  }
  // 成长任务
  growthTask(token) {
    return this.fetch('/growth/findUserGrowthTask', {
      accessToken: token,
    });
  }
  // 成长日志
  growthLogs(token) {
    return this.fetch('/growth/userGrowthDetail', {
      accessToken: token,
      page: 1,
      pageSize: 1000,// 15
      type: 1,
    });
  }
  // 签到
  growthSignIn(token) {
    return this.fetch('/growth/signIn', {
      accessToken: token,
    });
  }
  // 浏览
  growthViewSign(token: string) {
    return this.fetch('/growth/viewMallSign', {productMainId: 92, accessToken: token})
  }
  // 分享助农好货
  growthShareProduct(token) {
    return this.fetch('/growth/shareProductSign', {
      productMainId: 62,
      accessToken: token,
    });
  }

  private fetch(uri: string, data: {[key: string]: any}) {
    return new Promise<any>(async (resolve, reject) => {
      const headers = {
        'o': 'oUe5g7FGLV9frAZ_uYKandx_5V80',
        'apiFrom': 'WXMA',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c33)XWEB/13639',
        'Content-Type': 'application/x-www-form-urlencoded',
        accessToken: data?.accessToken
      }
      const response = await fetch(`https://wcxapi.gxwcx.com/apiWxStore/v1.0/${uri}`, {method: 'POST', headers, body: qs.stringify(data)});
      if (response.ok) {
        const json = await response.json()
        console.log(json);
        if (json.code == 1 || json.code == 0) {
          resolve(json.data)
        }

        if(json.code == 510) {
          reject(json)
        }
      }
      reject("error")
    })
  }
}
