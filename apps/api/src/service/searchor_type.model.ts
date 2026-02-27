import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Searchor from '../entity/searchor';
import {DeepPartial, Repository} from 'typeorm';
import SearchorType from "../entity/searchor_type";

@Injectable()
export default class SearchorTypeModelService {
  constructor(@InjectRepository(SearchorType) private searchorTypeModel: Repository<SearchorType>) {}
  find(id: number) {
    return this.searchorTypeModel.findOneBy({id});
  }
  findByName(name: string) {
    return this.searchorTypeModel.findOneBy({name})
  }
  all() {
    return this.searchorTypeModel.find({
      relations: ['searchors'],
      order: {
        sort: 'ASC',
        searchors: {
          sort: 'ASC'
        }
      }
    });
  }
  update(id: number, data: DeepPartial<SearchorType>){
    return this.searchorTypeModel.update({id}, data)
  }
  create(data: DeepPartial<SearchorType>) {
    return this.searchorTypeModel.save(data)
  }
}
