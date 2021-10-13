import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodDetail } from 'src/app/models/foodDetail';
import { FoodImage } from 'src/app/models/foodImage';
import { FoodDetailService } from 'src/app/services/food-detail.service';
import { FoodImageService } from 'src/app/services/food-image.service';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/models/cartModel';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  foods: Food[] = [];

  images: FoodImage[] = [];

  currentCar : FoodDetail;

  dataLoaded = false;


  constructor(private foodService:FoodDetailService, 
    private carImageService:FoodImageService,private authService:AuthService,
    private cartService:CartService, private activatedRoute:ActivatedRoute,
    private toastrService: ToastrService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getFoodsByFoodId(params["carId"]);
        this.getImageByCarId(params["carId"]);
      }else{
        //this.getCars();
        //this.getImages();
      }
    })
    
  }

  

  getCars(){
    this.foodService.getFood().subscribe(Response=>{
      this.foods = Response.data;
      this.dataLoaded = true;
    })
  }

  getFoodsByFoodId(id:number){
    this.foodService.getFoodsByFoodId(id).subscribe(response=>{
      this.foods = response.data;
      this.dataLoaded = true;
    })
  }

  getImageByCarId(carId:number){
    this.carImageService.getImageByFoodId(carId).subscribe(response=>{
      this.images = response.data;
      this.dataLoaded = true;
    })
  }

  addToCart(food:Food){
      if(food.yemekID === 1){
        this.toastrService.error("Bu Ürün Sepete Eklenemez");
      }else{
      let cart = new CartModel()
      cart.foodId = food.yemekID
      cart.quantity = 1
      cart.tamamlandimi = false
      cart.userId = this.authService.userId
      if(this.authService.userId!=null){
        this.cartService.Add(cart).subscribe(response=>{
          console.log(cart)
          this.toastrService.success("Sepete Eklendi", food.yemekAdi);
        },responseError=>{
          if(responseError.error.Errors.length>0){
            for(let i = 0;i<responseError.error.Errors.length;i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            }
          }
        });
      }else{
        this.toastrService.error("Kullanıcı Giriş Yapmalasınız");
      }
      
      }  
    }

  getImages(){
    this.carImageService.getImages().subscribe(response=>{
      this.images = response.data;
      console.log(response.data)
    })
  }
}
