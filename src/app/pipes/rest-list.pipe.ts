import { Pipe, PipeTransform } from '@angular/core';
import { Restourant } from '../models/restourant';

@Pipe({
  name: 'restList'
})
export class RestListPipe implements PipeTransform {

  transform(value: Restourant[], filterRest:string): Restourant[] {
    filterRest = filterRest?filterRest.toLocaleLowerCase():""
    return filterRest?value
    .filter((r:Restourant)=>r.restoranAdi.toLocaleLowerCase().indexOf(filterRest)!==-1):value;
  }

}
