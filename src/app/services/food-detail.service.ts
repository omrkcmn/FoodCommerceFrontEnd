import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../models/food';
import { FoodDetail } from '../models/foodDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FoodDetailService {

  apiUrl = "https://localhost:5001/api/";
  
  constructor(private httpClient:HttpClient) { }

  getFood():Observable<ListResponseModel<Food>>{
    let newPath = this.apiUrl + "food/getall";

    return this.httpClient.get<ListResponseModel<Food>>(newPath);
  }
  
  getFoodsByRestId(restId:number):Observable<ListResponseModel<Food>>{
    let newPath = this.apiUrl + "food/getbyrestid?id=" + restId;
    return this.httpClient.get<ListResponseModel<Food>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<FoodDetail>>{
    let newPath = this.apiUrl + "food/getfooddetail?id=" + brandId;
    return this.httpClient.get<ListResponseModel<FoodDetail>>(newPath);
  }


  getFoodsByFoodId(carId:number):Observable<ListResponseModel<Food>>{
    let newPath = this.apiUrl + "food/getfooddetail?id=" + carId;
    return this.httpClient.get<ListResponseModel<Food>>(newPath);
  }  
}
