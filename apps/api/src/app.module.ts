import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import AuthModule from './module/auth';
import AppController from './controller/app';
import AppService from './service/app';
import MysqlModule from "./module/mysql";
import ResponseModule from "./module/response";
import AuthController from "./controller/auth";
import AuthService from "./service/auth";
import SearchorController from "./controller/searchor";
import SearchorService from "./service/searchor";
import NoteController from './controller/note';
import NoteService from './service/note';
import CronController from './controller/cron';
import CronService from './service/cron';
import YouNongPaiController from "./controller/you_nong_pai";
import YouNongPaiService from "./service/you_nong_pai";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MysqlModule,
    AuthModule,
    ResponseModule,
  ],
  controllers: [
    AppController,
    CronController,
    YouNongPaiController,
    AuthController,
    NoteController,
    SearchorController
  ],
  providers: [
    AppService,
    CronService,
    YouNongPaiService,
    AuthService,
    NoteService,
    SearchorService,
  ],
})
export class AppModule {}
