import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodImage } from '../models/foodImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FoodImageService {

  apiUrl = "https://localhost:5001/api/";
  
  constructor(private httpClient:HttpClient) { }
  getImages(){
    let newPath = this.apiUrl + "foodimage/getallimages";
    return this.httpClient.get<ListResponseModel<FoodImage>>(newPath);
  }
  
  getImageByFoodId(foodId:number):Observable<ListResponseModel<FoodImage>>{
    let newPath = this.apiUrl + "foodimage/getimagebyfoodid?foodId=" + foodId;
    return this.httpClient.get<ListResponseModel<FoodImage>>(newPath);
  }

  add(img:FormData):Observable<SingleResponseModel<FoodImage>>{
    let newPath = this.apiUrl + "foodimage/addimage";
    return this.httpClient.post<SingleResponseModel<FoodImage>>(newPath,img);
  }

  delete(img:FoodImage):Observable<ResponseModel>{
    let newPath = this.apiUrl + "foodimage/deleteimage";
    return this.httpClient.post<ResponseModel>(newPath,img);
  }

  update(img:FoodImage):Observable<ResponseModel>{
    let newPath = this.apiUrl + "foodimage/updateimage";
    return this.httpClient.post<ResponseModel>(newPath,img);
  }
}