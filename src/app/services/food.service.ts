import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../models/food';
import { FoodDetail } from '../models/foodDetail';
import { FoodImage } from 'src/app/models/foodImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { BaseUrl } from './baseurl';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  apiUrl = new BaseUrl().apiUrl

  constructor(private httpClient:HttpClient) { }
  
  getFood():Observable<ListResponseModel<Food>>{
    let newPath = this.apiUrl + "food/getall";
    return this.httpClient.get<ListResponseModel<Food>>(newPath);
  }


  getFoodByName(data:string):Observable<ListResponseModel<Food>>{
    let newPath = this.apiUrl + "food/getalbyname?data=" + data;
    return this.httpClient.get<ListResponseModel<Food>>(newPath);
  }

  
  getFoodsByFoodId(foodId:number):Observable<SingleResponseModel<Food>>{
    let newPath = this.apiUrl + "food/getfoodbyid?id=" + foodId;
    return this.httpClient.get<SingleResponseModel<Food>>(newPath);
  }

  getFilteredCarDetailByFoodNameAndRestName(foodName:string, restname:string):Observable<ListResponseModel<Food>>{
    let newPath=this.apiUrl + "food/GetAllByFoodAndRestName?foodName=" + foodName + "&restName=" + restname;
    return this.httpClient.get<ListResponseModel<Food>>(newPath);
  }

  getFoodByRestId(restId:number):Observable<ListResponseModel<FoodDetail>>{
    let newPath=this.apiUrl + "food/getbyrestid2?id=" + restId;
    return this.httpClient.get<ListResponseModel<FoodDetail>>(newPath);
  }

  getFoodByRestIdOver(restId:number):Observable<ListResponseModel<Food>>{
    let newPath=this.apiUrl + "food/getbyrestid?id=" + restId;
    return this.httpClient.get<ListResponseModel<Food>>(newPath);
  }

  add(food:Food):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "food/addfood",food);
  }

  update(food:Food):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "food/updateFood", food);
  }
  delete(food:Food):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "food/deletefood",food);
  }
}
