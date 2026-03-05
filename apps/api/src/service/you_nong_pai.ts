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
      balance: await this.findUserBalance(token),
      user: await this.findUserInfo(token),
      logs: await this.findMoneyLogs(token),
      draw: await this.startDraw(token),
      index: await this.getDrawIndex(token),
      free: await this.freeIndex(token),
      view: await this.view(token)
    };
  }
  tokens() {
    return instanceToPlain(this.youNongPaiModelService.all());
  }
  async cron() {
    const ynps = await this.youNongPaiModelService.all()
    for (const ynp of ynps) {
      this.growthTask(ynp.token).then(async (tasks: {taskType: string, taskName: string, isFinish: number, finishTimes: number, allTimes: number, growth: number, maxGrowth}[]) => {
        console.log(tasks)
        for(const task of tasks) {
          if (task.isFinish === 0) {
            switch(task.taskType) {
              case 'TASK_GET_BT': // 领取惠民补贴
                await this.startDraw(ynp.token);
              break;
              case 'TASK_SIGN': // 今日签到
                await this.growthSignIn(ynp.token);
              break;
              case 'TASK_SHARE':
                for(let i=task.allTimes-task.finishTimes; i>0; i--) {
                  await this.growthShareProduct(ynp.token);
                }
              break;
              case 'TASK_MALL':
                for(let i=task.allTimes-task.finishTimes; i>0; i--) {
                  await this.growthViewSign(ynp.token);
                }
              break;
            }
          }
          
        }
      }).catch(err => {
        console.log(err)
      })
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
  findUserInfo(token: string) {
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
  // 签到
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
