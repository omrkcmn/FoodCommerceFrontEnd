import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaims } from '../models/operationClaims';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = "https://localhost:5001/api/User/"
  constructor(private httpService:HttpClient) { }

  delete(id:number):Observable<ResponseModel>{
    let newPath = this.api + `delete?id=${id}`;
    return this.httpService.get<ResponseModel>(newPath);
  }

  GetOperationClaims(userId:number):Observable<ListResponseModel<OperationClaims>>{
    let newPath = this.api + "getclaims?userId=" + userId;
    return this.httpService.get<ListResponseModel<OperationClaims>>(newPath);
  }

  add(user:User):Observable<ResponseModel>{
    let newPath = this.api + "adduser";
    return this.httpService.post<ResponseModel>(newPath,user);
  }

  update(user:User):Observable<ResponseModel> {
    let newPath = this.api + "updateuser"
    return this.httpService.post<ResponseModel>(newPath,user);
  }

  GetByMail(email:string):Observable<SingleResponseModel<User>>{
    let newPath = this.api + `GetByMail?email=${email}`;
    return this.httpService.get<SingleResponseModel<User>>(newPath);
  }

  GetAll():Observable<ListResponseModel<User>> {
    let newPath = this.api + "GetAll";
    return this.httpService.get<ListResponseModel<User>>(newPath);
  }

  GetRestIdByUserId(id:number):Observable<ResponseModel>{
    let newPath = this.api + "getrestid?id="+id;
    return this.httpService.get<ResponseModel>(newPath);
  }

  GetUser():Observable<ListResponseModel<User>>{
    let newPath = this.api + "getuser";
    return this.httpService.get<ListResponseModel<User>>(newPath);
  }

  getUserByUserId(id:number):Observable<SingleResponseModel<User>>{
    let newPath = this.api + "getbyid?id="+id;
    return this.httpService.get<SingleResponseModel<User>>(newPath);
  }

  getUserByUserId2(id:number):Observable<ListResponseModel<User>>{
    let newPath = this.api + "getbyid?id="+id;
    return this.httpService.get<ListResponseModel<User>>(newPath);
  }

}
