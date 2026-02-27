import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entity/user';
import {ConfigModule, ConfigService} from "@nestjs/config";
import fs from "fs";
import path from "path";
import SearchorModelService from "../service/searchor.model";
import UserModelService from '../service/user.model';
import Searchor from "../entity/searchor";
import SearchorType from "../entity/searchor_type";
import SearchorTypeModelService from "../service/searchor_type.model";
import NoteCategoryModelService from '../service/note_category.model';
import NoteContentModelService from '../service/note_content.model';
import NoteCategory from '../entity/note_category';
import NoteContent from '../entity/note_content';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '../entity/*.ts'],
        autoLoadEntities: true,
        logging: true,
        timezone: "+08:00",
        logger: "advanced-console",
        ssl: {
          ca: fs.readFileSync(path.join(__dirname, '../../mysql.pem')),
        },
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Searchor, SearchorType, NoteCategory, NoteContent]),
  ],
  providers: [UserModelService, SearchorModelService, SearchorTypeModelService, NoteCategoryModelService, NoteContentModelService],
  exports: [UserModelService, SearchorModelService, SearchorTypeModelService, NoteCategoryModelService, NoteContentModelService],
})
export default class MysqlModule {}