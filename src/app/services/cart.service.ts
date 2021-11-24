import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { FoodDetail } from '../models/foodDetail';
import { CartDetailsItem } from '../models/cartDetail';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { CartModel } from '../models/cartModel';
import { ResponseModel } from '../models/responseModel';
import { ToastrService } from 'ngx-toastr';
import { BaseUrl } from './baseurl';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = new BaseUrl().apiUrl

  constructor(private httpClient:HttpClient,
    private toastr:ToastrService) { }

  /*addToCart(food:Food){
    let item = CartItems.find(c=>c.food.yemekID === food.yemekID);

    if(item){
      item.quantity += 1;
    }else{
      let cartItem = new CartItem();
      cartItem.food = food;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }*/


  getCartByUserId(userId:number):Observable<ListResponseModel<Cart>>{
    let newPath = this.apiUrl + "cart/getbyuserid?id=" + userId;
    return this.httpClient.get<ListResponseModel<Cart>>(newPath);
  }

  Add(cart:CartModel):Observable<ResponseModel>{
    CartItems.push(cart);

    if(CartItems[0].restId === cart.restId){
      return this.httpClient.post<ResponseModel>(this.apiUrl + "cart/add",cart);
    }else{
      this.toastr.info("Sepetinizde farklı bir restorandan ürün bulunmaktadır.")
      return null;
    }
                
  }

  delete(cart:CartModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cart/delete",cart);
  }


  update(cart:CartModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "cart/update",cart);
  }
}
