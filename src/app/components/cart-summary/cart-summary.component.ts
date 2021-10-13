import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { FoodDetail } from 'src/app/models/foodDetail';
import { AuthService } from 'src/app/services/auth.service';
import { CartModel } from 'src/app/models/cartModel';
import { Cart } from 'src/app/models/cart';
import { ActivatedRoute } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:Cart[]=[];

  constructor(private cartService:CartService,
    public authService:AuthService,
    private toastrService:ToastrService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCart(this.authService.userId)
    setTimeout(() => this.ngOnInit(),500)
  }


  getCart(userId:number){
    this.cartService.getCartByUserId(userId).subscribe(response=>{
        this.cartItems = response.data
    });
  }


}
