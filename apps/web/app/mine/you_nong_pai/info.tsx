"use client";

import React, {HTMLAttributes} from "react";
import {Avatar, Button, Input, List, Popover, SegmentedControlItem, Table, ThemeIcon} from "@mantine/core";
import api, {YouNongPai} from "@/api";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';
import {Calendar} from "@mantine/dates";
import _ from 'lodash';
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import Switch from "@/components/switch";

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
            <div className="w-[600] max-md:w-full">
              <div className="w-full flex items-center">
                <Avatar src={info?.user.header} size="lg" alt={info?.user.nickName} />
                <span>{info?.user.nickName}</span>
                <span>{info?.draw_info.balance}/{info?.draw_info.totalBalance}</span>
              </div>
              <div className="flex content-between">
                <div className="w-full flex flex-col justify-center items-center">
                  <div>{info?.draw_info.balance}/{info?.draw_info.totalBalance}</div>
                  <div>已用补贴</div>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div>{info?.growth_info.growth}/{info?.growth_info.allGrowth}</div>
                  <div>成长</div>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div>{info?.draw_info.balance}/{info?.draw_info.totalBalance}</div>
                  <div>已用补贴</div>
                </div>
                <div className="w-full flex flex-col items-center">
                  <div>{info?.draw_info.balance}/{info?.draw_info.totalBalance}</div>
                  <div>已用补贴</div>
                </div>
              </div>
              <List spacing={10} size="lg">
                {info.tasks.map(task => (<List.Item 
                  key={task.taskName} 
                  classNames={{
                    itemWrapper: 'w-full',
                    itemLabel: 'w-full flex justify-between items-center'
                  }}
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      {task.isFinish ? <IconCircleCheck  size={16} /> : <IconCircleDashed size={16} />}
                    </ThemeIcon>
                  }>
                    <Switch value={task.taskType}>
                      <Switch.Case case='VERIFY_USER_REGISTER'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled>已完成</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='VERIFY_PROXY'>
                        <>
                          <div>
                            <span>{task.taskName}</span>
                            <span className="text-sm text-gray-500">{task.taskDes}</span>
                          </div>
                          <div><Button size="xs" disabled>去完成</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='VERIFY_DIRECT'>
                        <>
                          <div>
                            <span>{task.taskName}</span>
                            <span className="text-sm text-gray-500">{task.taskDes}</span>
                          </div>
                          <div><Button size="xs" disabled>去完成</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='VERIFY_COUNTY_SERV'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled>已完成</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='ZN_MILK_CONSUME'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled>已完成</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='ZN_PRODUCT_CONSUME'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled>已完成</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='TASK_SIGN'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled={!!task.isFinish}>{!!task.isFinish ? '已完成' : '去完成'}</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='TASK_MALL'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled={!!task.isFinish}>{!!task.isFinish ? '已完成' : '去完成'}</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='TASK_GET_BT'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled={!!task.isFinish}>{!!task.isFinish ? '已完成' : '去完成'}</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='TASK_SHARE'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled={!!task.isFinish}>{!!task.isFinish ? '已完成' : '去完成'}</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='TASK_INVITE'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled>已完成</Button></div>
                        </>
                      </Switch.Case>
                      <Switch.Case case='TASK_ZN_HD'>
                        <>
                        <div>
                          <span>{task.taskName}</span>
                          <span className="text-sm text-gray-500">{task.taskDes}</span>
                        </div>
                        <div><Button size="xs" disabled>去完成</Button></div>
                        </>
                      </Switch.Case>
                    </Switch>
                </List.Item>))}
                
              </List>
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
                          {draw_logs.map((log, index) => <Table.Tr className="bg-red-300/10!" key={index}>
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