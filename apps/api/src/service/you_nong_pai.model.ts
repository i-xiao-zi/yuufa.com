import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import YouNongPai from "../entity/you_nong_pai";

@Injectable()
export default class YouNongPaiModelService {
  constructor(@InjectRepository(YouNongPai) private youNongPaiModel: Repository<YouNongPai>) {}
  find(id: number) {
    return this.youNongPaiModel.findOneBy({id});
  }
  all() {
    return this.youNongPaiModel.find();
  }
  update(id: number, data: DeepPartial<YouNongPai>){
    return this.youNongPaiModel.update({id}, data)
  }
  create(data: DeepPartial<YouNongPai>) {
    return this.youNongPaiModel.save(data)
  }
}
