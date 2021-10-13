import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { RegisterModel } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:5001/api/auth/';
  
  userName: string;
  public userId: number;  
  public userdata: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  


  constructor(private httpClientService:HttpClient,
    private localStorageService: LocalStorageService,
    private user:UserService) {
   }

  login(user:LoginModel){
      return this.httpClientService.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login",user);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  register(user:RegisterModel):Observable<ResponseModel>{
    return this.httpClientService.post<ResponseModel>(this.apiUrl + "register",user);
  }


  async userDetailFromToken() {
    const helper = new JwtHelperService();
    let token: any = this.localStorageService.get("token");
    const decodedToken = helper.decodeToken(token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.userName = name;
    this.userId =Number(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    /*  this.user.getByUserId(this.userId).subscribe((response) => {
      this.customerdata.next(response.data.id);
    });
    
    this.customerdata.subscribe((data) => {
      this.customerId = data;
    });*/

    this.user.getUserByUserId(this.userId).subscribe((response) => {
      this.userdata.next(this.userId);
    });
  }
  
}