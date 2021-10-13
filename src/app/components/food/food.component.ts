import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restourant } from 'src/app/models/restourant';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { FoodImage } from 'src/app/models/foodImage';
import { RestourantService } from 'src/app/services/restourant.service';
import { FoodDetailService } from 'src/app/services/food-detail.service';
import { FoodImageService } from 'src/app/services/food-image.service';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/models/cartModel';
import { AuthService } from 'src/app/services/auth.service';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CartComponent } from '../cart/cart.component';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder } from '@angular/forms';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foods: Food[] = [];
  images: FoodImage[] = [];
  totalRecords:number
  page:Number=1
  p:any
  

  restourants: Restourant[] = [];
  
  result: string[] = [];
  filterText : ""
  filterRestourant : string;
  currentCar: Food;
  comp2:CartSummaryComponent;
  cart2:Cart[]=[]

  constructor(private foodService: FoodService, 
    private restourantService: RestourantService,
    private carImageService: FoodImageService,
    private toastrService: ToastrService,
    private userService:UserService,
    private orderService:OrderService,
    private cartService:CartService,
    private authService:AuthService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    /*this.activatedRoute.params.subscribe(params=>{
      if(params["restId"]){
        this.getFoodsByRestId(params["restId"]);
      }else{
        this.getFoods();  
        this.getBrandName();
      }
    }*/

    this.activatedRoute.params.subscribe(params=>{
      if(params["restId"]){
        this.getFoodsByRestId(params["restId"])
      }else{
        this.getFoods()
        this.getBrandName()
      }
    });

  }

  getFoodsByRestId(id:number){
    this.foodService.getFoodByRestIdOver(id).subscribe(response=>{
      this.foods = response.data
    })
  }
  getCarImage(food: Food) {
    if (food.yemekResim) {
      return food.yemekResim;
    } else {
      return '/images/default.jpg';
    }
  }
  
  getImages(){
    this.carImageService.getImages().subscribe(response=>{
      this.images = response.data;
    })
  }

  getFoods(){
    this.foodService.getFood().subscribe(response=>{
      this.foods = response.data;
      this.totalRecords = response.data.length    
    });

  }


  setCurrentCar(food:Food){
    this.currentCar = food;
  }

  getCurrentCarClass(food:Food){
    if(food == this.currentCar){
      return  "list-group-item active"
    }else
    {
      return "list-group-item"
    }
  }

  addToCart(food: Food){
    if(food.yemekID === 1){
      this.toastrService.error("Bu Ürün Sepete Eklenemez");
    }else{
      let cart = new CartModel()
      
      cart.foodId = food.yemekID
      cart.quantity = 1
      cart.restId = food.restoranID
      cart.tamamlandimi = false
      cart.userId = this.authService.userId
      
      
      this.cartService.getCartByUserId(this.authService.userId).subscribe(response=>{
        this.cart2 = response.data
      })
      
      if(this.authService.userId!=null){
          this.cartService.Add(cart).subscribe(response=>{
            this.toastrService.success("Sepete Eklendi", food.yemekAdi);
          },responseError=>{
            if(responseError.error.Errors.length>0){
              for(let i = 0;i<responseError.error.Errors.length;i++){
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
              }
            }
          });
      }else{
        this.toastrService.error("Giriş Yapmanız Gerekmektedir");
      }
      
    }  
  }

  getAllCarClass(){
    if(!this.currentCar){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }

  getFilteredCarDetailByFoodNameAndRestName(foodname:string,restname:string){
    this.foodService.getFilteredCarDetailByFoodNameAndRestName(foodname,restname).subscribe(response=>{
      this.foods = response.data;
    })
  }

  getBrandName(){
      this.restourantService.getRestourants().subscribe(response=>{
        this.restourants = response.data;
      })

      this.result = Array.from(new Set(this.restourants.map(x=>x.restoranAdi)));
  }

getSelectedBrand(foodName:string){
  if(this.filterText==foodName){
    return true ;
  }
  else{
    return false;
  }

}

}