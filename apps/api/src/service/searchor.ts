import {Injectable} from '@nestjs/common';
import SearchorModelService from "./searchor.model";
import SearchorTypeModelService from "./searchor_type.model";
import { instanceToPlain } from "class-transformer";

@Injectable()
export default class SearchorService {
  constructor(private readonly searchorModelService: SearchorModelService, private readonly searchorTypeModelService: SearchorTypeModelService) {}
  index() {
    return instanceToPlain(this.searchorTypeModelService.all());
  }
}
