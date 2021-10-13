import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { CartModel } from 'src/app/models/cartModel';
import { Food } from 'src/app/models/food';
import { Order } from 'src/app/models/order';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  foods:Cart[]=[];
  total:number;
  miktar:number;
  newTotal:number;
  //orderModel:Order[]=[];
  constructor(
    
    public authService:AuthService,
    private userService:UserService,
    private orderService:OrderService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastr:ToastrService,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["userId"]){
        this.getCartItems(params["userId"]);
        //this.createOrderAddForm()
      }else{
        //this.getCars();
        //this.getImages();
      }
    })
  }

  /*createOrderAddForm(){
    this.orderAddForm = this.formBuilder.group({
        restoranID:["",Validators.required]
    })
   }*/

  deleteCartItem(cart:Cart){
    let cartModel = new CartModel()
    cartModel.foodId = cart.yemekID
    cartModel.id = cart.id
    console.log(cartModel.foodId)
    console.log(cartModel.id)
    this.cartService.delete(cartModel).subscribe(response=>{
      this.foods = []
      window.location.reload()
    })
  }


  getCartItems(userId:number){
    this.cartService.getCartByUserId(userId).subscribe(response=>{
      this.foods = response.data;
    })
  }

  updateCartItem(cart:Cart){
    var cartModel = new CartModel();
    cartModel.foodId = cart.yemekID;
    cartModel.userId = this.authService.userId
    cartModel.quantity = cart.miktar;
    cartModel.id = cart.id
    this.cartService.update(cartModel).subscribe(response=>{
      this.toastr.success("Ürün Miktarı Güncellendi");
    })
  }

  
  addOrder(){
      var cartModel = new CartModel()
      var orderModel = new Order()

      
      cartModel.userId = this.authService.userId
      
      this.cartService.getCartByUserId(this.authService.userId).subscribe(response=>{
        this.foods = response.data

        for(var i = 0; i < this.foods.length; i++){
          cartModel.restId = this.foods[i].restoranID;
          
          orderModel.restoranID = cartModel.restId
          orderModel.kullaniciID = cartModel.userId
          


          orderModel.tamamlandimi = false
          orderModel.miktar = this.foods[i].miktar;
          console.log("Sipariş Miktarı" + orderModel.miktar)
          orderModel.yemekID = this.foods[i].yemekID
          
          this.deleteCartItem(this.foods[i]);

          this.orderService.addOrder(orderModel).subscribe(response=>{
            this.toastr.success("Sipariş Başarılı!")
          },responseError=>{
            if(responseError.error.Errors.length>0){
              for(let i = 0;i<responseError.error.Errors.length;i++){
                this.toastr.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              }
            }
          });       
        }    
      }) 
    }
  get toplam()
  {
    return Number(this.foods.reduce((sum,x)=>
    ({quantity:1,
      priceWhenBought:sum.priceWhenBought+x.fiyat*x.miktar}),
    {quantity:1,priceWhenBought:0}).priceWhenBought);
  }
}
