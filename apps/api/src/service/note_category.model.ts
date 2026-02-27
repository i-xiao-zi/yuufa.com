import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import NoteCategory from '../entity/note_category';
import {DeepPartial, Repository} from 'typeorm';

@Injectable()
export default class NoteCategoryModelService {
  constructor(@InjectRepository(NoteCategory) private noteCategoryModel: Repository<NoteCategory>) {}
  find(id: number) {
    return this.noteCategoryModel.findOneBy({id});
  }
  allByParentId(parent_id: number) {
    return this.noteCategoryModel.find({
      where: {
        parent_id,
      },
      relations: ["contents"],
      order: {
        sort: "ASC",
        contents: {
          sort: "ASC",
        },
      },
    });
  }


  all() {
    return this.noteCategoryModel.find({
      where: {
        parent_id: 0,
      },
      relations: ["children", "contents", "children.contents", "children.children"],
      // order: {
      //   sort: "ASC",
      //   children: {
      //     sort: "ASC",
      //     contents: {
      //       sort: "ASC",
      //     },
      //     children: {
      //       sort: "ASC",
      //     }
      //   },
      //   contents: {
      //     sort: "ASC",
      //   }
      // },
      // select: {
      //   id: true,
      //   parent_id: true,
      //   name: true,
      //   sort: true,
      //   children: {
      //     id: true,
      //     parent_id: true,
      //     name: true,
      //     sort: true,
      //     contents: {
      //       id: true,
      //       category_id: true,
      //       title: true,
      //       sort: true,
      //     },
      //     children: {
      //       id: true,
      //       parent_id: true,
      //       name: true,
      //       sort: true,
      //     },
      //   },
      //   contents: {
      //     id: true,
      //     category_id: true,
      //     title: true,
      //     sort: true,
      //   }
      // }
    });
  }
}
