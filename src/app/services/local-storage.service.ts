import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  
  constructor() {this.localStorage = window.localStorage; }

  addToken(token:TokenModel){
    localStorage.setItem("token",token.token);
    localStorage.setItem("expiration",token.expiration);
  }

  removeToken(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  addCurrentCustomer(user:User){
    localStorage.setItem("currentUser",user.email);
  }

  removeCurrentCustomer(){
    localStorage.removeItem("currentUser");
  }

  addCurrentUserId(user:User){
    localStorage.setItem("currentUserId",user.id.toString());
  }

  getCurrentUserId(){
    return localStorage.getItem("currentUserId")
  }

  removeCurrentUserId(){
    localStorage.removeItem("currentUserId");
  }

  /*addOrder(order:Order){
    localStorage.setItem("rentalModel",JSON.stringify(rentalModel));
  }*/

  /*/getRental(){
    var data = localStorage.getItem("rentalModel");
    if (data) {
        return JSON.parse(data)
    }
  }

  removeRental(){
    localStorage.removeItem("rentalModel");
  }*/

  get(key : string){
    return this.localStorage.getItem(key);
  }
  getCurrentUser(){
    return localStorage.getItem("currentUser")
  }
}
