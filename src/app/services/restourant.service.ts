import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Restourant } from '../models/restourant';
import { Food } from '../models/food';
import { ResponseModel } from '../models/responseModel';
import { BaseUrl } from './baseurl';


@Injectable({
  providedIn: 'root'
})
export class RestourantService {
  apiUrl = new BaseUrl().apiUrl

  constructor(private httpClient: HttpClient) { }

  getRestourants():Observable<ListResponseModel<Restourant>>{
    let newPath = this.apiUrl + "restourant/getall";
    return this.httpClient.get<ListResponseModel<Restourant>>(newPath);
  }

  getRestsByRestId(restId:number):Observable<ListResponseModel<Restourant>>{
    let newPath = this.apiUrl + "restourant/getallbyid?id=" + restId;
    return this.httpClient.get<ListResponseModel<Restourant>>(newPath);
  }

  add(rest:Restourant):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "restourant/addres",rest);
  }

  update(rest:Restourant):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "restourant/updateres",rest);
  }

  delete(rest:Restourant):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "restourant/deleteres",rest);
  }
}
