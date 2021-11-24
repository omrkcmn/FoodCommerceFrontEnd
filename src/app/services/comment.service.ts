import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { BaseUrl } from './baseurl';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = new BaseUrl().apiUrl

  constructor(private httpClient:HttpClient) { }

  getCommentsByRestId(id:number):Observable<ListResponseModel<Comment>>{
    let newPath = this.apiUrl + "comment/getallbyrestid?restourantID=" + id;
    return this.httpClient.get<ListResponseModel<Comment>>(newPath);
  }

  add(comment:Comment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "comment/add",comment);
  }
}
