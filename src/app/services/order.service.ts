import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Order } from '../models/order';
import { OrderDetail } from '../models/orderDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "https://localhost:5001/api/";

  constructor(private httpClient:HttpClient ) { }


  getOrderDetail(userId:number,tamamlanma:boolean):Observable<ListResponseModel<OrderDetail>>{
    let newPath = this.apiUrl + "order/getorderdetail?userid=" + userId + "&tamamlama=" + tamamlanma;
    return this.httpClient.get<ListResponseModel<OrderDetail>>(newPath);
  }


  getOrderDetailByRestId(restId:number,tamamlanma:boolean):Observable<ListResponseModel<OrderDetail>>{
    let newPath = this.apiUrl + "order/getrestorders?restID=" + restId + "&tamamlama=" + tamamlanma;
    return this.httpClient.get<ListResponseModel<OrderDetail>>(newPath);
  }


  updateOrder(order:Order):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "order/updateorder",order);
  }

  addOrder(order:Order):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "order/addorder",order);
  }


}
