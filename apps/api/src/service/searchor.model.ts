import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Searchor from '../entity/searchor';
import {DeepPartial, Repository} from 'typeorm';

@Injectable()
export default class SearchorModelService {
  constructor(@InjectRepository(Searchor) private searchorModel: Repository<Searchor>) {}
  find(id: number) {
    return this.searchorModel.findOneBy({id});
  }
  findByName(name: string) {
    return this.searchorModel.findOneBy({name})
  }
  all() {
    return this.searchorModel.find({relations: ['type'], order: {sort: 'ASC'}});
  }
  async allType() {
    return (await this.searchorModel.createQueryBuilder().select(['`type`']).groupBy('type').getRawMany()).map(item => item.type);
  }
  update(id: number, data: DeepPartial<Searchor>){
    return this.searchorModel.update({id}, data)
  }
  create(data: DeepPartial<Searchor>) {
    return this.searchorModel.save(data)
  }
}
