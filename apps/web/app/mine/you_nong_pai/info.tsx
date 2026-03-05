"use client";

import React, {HTMLAttributes} from "react";
import {Avatar, Button, Input, SegmentedControlItem} from "@mantine/core";
import api, {YouNongPai} from "@/api";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import {Calendar} from "@mantine/dates";
import _ from 'lodash';

interface Props extends HTMLAttributes<HTMLDivElement>{
  token: SegmentedControlItem;
  active?: boolean;
}

export default function YouNongPaiInfo(props: Props) {
  const [info, setInfo] = React.useState<YouNongPai|undefined>(undefined);
  React.useEffect(() => {
    api.youNongPai(props.token.value).then(data => setInfo(data.data))
  }, [props.token])
  return (
    <div className={`${props.className || ''} ${props.active ? '' : 'hidden'}`}>
      <div className="flex mb-5">
        <Input className="flex-auto" value={props.token.value} onChange={() => {}} />
        <Button>修改</Button>
      </div>
      {
        !!info && (
          <div className="flex">
            <div className="w-[400]">
              <div className="w-full flex items-center">
                <Avatar src={info?.user.header} size="lg" alt={info?.user.nickName} />
                <span>{info?.user.nickName}</span>
                <span>{info?.draw_info.balance}/{info?.draw_info.totalBalance}</span>
              </div>
              <Button onClick={() => {
                api.youNongPaiTask(props.token.value, 'view').then(data => {
                  console.log(data)
                })
              }}>逛逛助农商城得成长值</Button>
              <Button onClick={() => {
                api.youNongPaiTask(props.token.value, 'share').then(data => {
                  console.log(data)
                })
              }}>分享助农好货</Button>
              <Button onClick={() => {
                api.youNongPaiTask(props.token.value, 'draw').then(data => {
                  console.log(data)
                })
              }}>领取惠民补贴</Button>
              <Button onClick={() => {
                api.youNongPaiTask(props.token.value, 'sign').then(data => {
                  console.log(data)
                })
              }}>今日签到</Button>
            </div>
            <div>
              <Calendar
                size="xl"
                locale={'zh-CN'}
                getDayProps={(date) => {
                  const today = dayjs().isSame(date, 'day') ? 'bg-red-300/10!' : '';
                  const draw_log = _.find(info?.draw_logs || [], log => dayjs.unix(log.createTime).isSame(date, 'day'));

                  const draw = draw_log ? 'relative before:content-["*"] before:absolute before:block before:w-full before:h-full': '';
                  return {
                    className: `${today} ${draw} bg-blue-100/20!`
                  }

                }}
                renderDay={(date) => {
                  const day = dayjs(date).date();
                  return <div>
                    {day}
                  </div>
                }}/>
            </div>
          </div>
        )
      }
      
    </div>
  );
}