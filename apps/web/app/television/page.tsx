import React from "react";
import {Metadata} from "next";
import { Button, Table, TableTbody, TableTd, TableTh, TableThead, TableTr } from '@mantine/core';
import api from "@/api";


export const metadata: Metadata = {
  title: "电视节目",
  description: "电视节目列表",
};

export default async function TelevisionPage() {
  const videoOriginins = await api.videoOrigin();
  console.log(videoOriginins);
  return (
    <main className="container mx-auto flex-auto z-1">
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>ID</TableTh>
            <TableTh>名称</TableTh>
            <TableTh>标题</TableTh>
            <TableTh>官网</TableTh>
            <TableTh>URL</TableTh>
            <TableTh>排序</TableTh>
            <TableTh>操作</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {videoOriginins.data?.map((item) => (
            <TableTr key={item.id}>
              <TableTd>{item.id}</TableTd>
              <TableTd>{item.name}</TableTd>
              <TableTd>{item.title}</TableTd>
              <TableTd>{item.home}</TableTd>
              <TableTd>{item.url}</TableTd>
              <TableTd>{item.sort}</TableTd>
              <TableTd>
                <Button color="primary">编辑</Button>
                <Button color="danger">删除</Button>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </main>
  )
}