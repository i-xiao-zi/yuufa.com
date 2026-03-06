"use client";

import React, {HTMLAttributes} from "react";
import {Avatar, Button, Input, List, Popover, SegmentedControlItem, Table} from "@mantine/core";
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
          <div className="flex max-md:flex-col">
            <div className="w-[400] max-md:w-full">
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
            <div className="flex-auto max-md:w-full">
              <Calendar
                size="xl"
                locale={'zh-CN'}
                getDayProps={(date) => {
                  const today = dayjs().isSame(date, 'day') ? 'bg-red-300/10!' : '';
                  const draw_log = _.find(info?.draw_logs || [], log => dayjs.unix(log.createTime).isSame(date, 'day'));

                  const draw = draw_log ? 'relative before:content-["*"] before:absolute before:block before:w-full before:h-full before:-z-1': '';
                  return {
                    className: `${today} ${draw} bg-blue-100/20!`
                  }

                }}
                renderDay={(date) => {
                  const day = dayjs(date).date();
                  const draw_logs = (info?.draw_logs || []).filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
                  const growth_logs = (info?.growth_logs || []).filter(log => dayjs.unix(log.createTime).isSame(date, 'day')).sort((a, b) => a.createTime - b.createTime);
                  return draw_logs.length + growth_logs.length === 0 
                  ? (<div className="w-full h-full flex items-center justify-center">{day}</div>)
                  : (<Popover width={400} trapFocus withArrow shadow="md">
                    <Popover.Target>
                      <div className="w-full h-full flex items-center justify-center">{day}</div>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Table>
                        <Table.Tbody>
                          {draw_logs.map(log => <Table.Tr className="bg-red-300/10!" key={log.createTime}>
                            <Table.Th>补贴</Table.Th>
                            <Table.Td>{log.des}</Table.Td>
                            <Table.Td>{log.amount}</Table.Td>
                            <Table.Td>{dayjs.unix(log.createTime).format('HH:mm')}</Table.Td>
                          </Table.Tr>)}
                          {growth_logs.map(log => <Table.Tr className="bg-blue-300/10!" key={log.createTime}>
                            <Table.Th>成长</Table.Th>
                            <Table.Td>{log.typeName}</Table.Td>
                            <Table.Td>{log.growth}</Table.Td>
                            <Table.Td>{dayjs.unix(log.createTime).format('HH:mm')}</Table.Td>
                          </Table.Tr>)}
                        </Table.Tbody>
                      </Table>
                    </Popover.Dropdown>
                  </Popover>)
                }}/>
            </div>
          </div>
        )
      }
      
    </div>
  );
}