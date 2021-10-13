import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '../models/food';

@Pipe({
  name: 'filterControl'
})

export class FilterControlPipe implements PipeTransform {
  transform(value: Food[], filterText:string):Food[]{
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((f:Food)=>f.yemekAdi.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }
}
