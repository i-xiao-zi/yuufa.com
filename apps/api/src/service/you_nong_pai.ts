import {Injectable} from '@nestjs/common';
import YouNongPaiModelService from "./you_nong_pai.model";
import {instanceToPlain} from "class-transformer";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import qs from 'qs';
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export default class YouNongPaiService {

  constructor(private readonly youNongPaiModelService: YouNongPaiModelService) {}
  async index(token) {
    return {
      index: await this.freeIndex(token),
      user: await this.userInfo(token),
      // draw_info: await this.findUserBalance(token),
      // draw_logs: await this.findMoneyLogs(token),
      // growth_info: await this.growthInfo(token),
      // growth_logs: await this.growthLogs(token),
      tasks: await this.growthTask(token),
      // zhunong_info: await this.zhunongInfo(token),
      // zhunong_logs: await this.zhunongLog(token),
    };
  }
  tokens() {
    return instanceToPlain(this.youNongPaiModelService.all());
  }
  async draw(token){
    return {
      info: await this.findUserBalance(token),
      logs: await this.findMoneyLogs(token),
    }
  }
  async growth(token){
    return {
      info: await this.growthInfo(token),
      logs: await this.growthLogs(token),
    }
  }
  async zhunong(token){
    return {
      info: await this.zhunongInfo(token),
      logs: await this.zhunongLog(token),
    }
  }
  async cron() {
    const ynps = await this.youNongPaiModelService.all()
    let res = {};
    for (const {token, name} of ynps) {
      const tasks = await this.growthTask(token);
      const zhunong_info = await this.zhunongInfo(token);
      const products = zhunong_info.recommendProducts;
      const  growth_info = await this.growthInfo(token);
      res[name] = {};
      if(growth_info.isSign == 0){
        res[name]['sign'] = await this.growthSignIn(token);
      }
      for(const task of tasks) {
        if (task.isFinish === 0) {
          switch(task.taskType) {
            case 'TASK_GET_BT': // 领取惠民补贴
              try{
                res[name]['draw'] = await this.startDraw(token);
              }catch (e){}
              break;
            case 'TASK_SHARE':// 分享助农好货
              try{
                res[name]['share'] = await this.growthShareProduct(token, products[0].productMainId);
              }catch (e){}
              break;
            case 'TASK_MALL':// 逛逛助农商城得成长值
              try{
                res[name]['view'] = await this.growthViewSign(token, products[1].productMainId);
              }catch (e){}
              break;
          }
        }
      }
    }
    return res;
  }
  async task(token: string, name: string) {
    const zhunong_info = await this.zhunongInfo(token);
    const products = zhunong_info.recommendProducts;
    if(name == 'draw') {
      return await this.startDraw(token);
    } else if (name == 'view') {
      return await this.growthViewSign(token, products[1].productMainId);
    } else if (name == 'sign') {
      return await this.growthSignIn(token);
    } else if (name == 'share') {
      return await this.growthShareProduct(token, products[0].productMainId);
    }
  }

  /**
   * 抽奖
   */
  startDraw(token: string) {
    return this.fetch('/index/startDraw', {accessToken: token});
  }

  zhunongLog(token: string) {
    let data = {
      page: 1,
      type: 1,
      pageSize: 1000,
      accessToken: token
    }
    return this.fetch('/userIntegral/findUserZnPoiontLogs', data);
  }

  zhunongInfo(token: string) {
    return this.fetch('/userIntegral/free/findZnIndex', {accessToken: token});
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
      endDay: dayjs().tz('Asia/Shanghai').format('YYYYMMDD'),
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
  growthViewSign(token: string, id) {
    return this.fetch('/growth/viewMallSign', {productMainId: id, accessToken: token})
  }
  // 分享助农好货
  growthShareProduct(token, id) {
    return this.fetch('/growth/shareProductSign', {
      productMainId: id,
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
      // const response = await fetch(`https://wcxapi.gxwcx.com/apiWxStore/v1.0/${uri}`, {method: 'POST', headers, body: qs.stringify(data)});
      const response = await fetch(`https://wcxapi.gxwcx.com/apiWxStore/v2/${uri}`, {method: 'POST', headers, body: qs.stringify(data)});
      if (response.ok) {
        const json = await response.json()
        resolve(json.data)
      }
      resolve({})
    })
  }
}
