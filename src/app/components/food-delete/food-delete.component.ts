import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { FoodImage } from 'src/app/models/foodImage';
import { FoodImageService } from 'src/app/services/food-image.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-delete',
  templateUrl: './food-delete.component.html',
  styleUrls: ['./food-delete.component.css']
})
export class FoodDeleteComponent implements OnInit {

  FoodDeleteForm: FormGroup;
  ImgDeleteForm:FormGroup;
  food:Food;
  foodID:number
  foodName:string
  restID:number
  imgPath:string
  img:FoodImage[]
  constructor(private formBuilder:FormBuilder,private foodService:FoodService,
    private toastr:ToastrService,
    private imgService:FoodImageService,
    private router:Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["foodId"]){
        this.getFoodByFoodId(params["foodId"]);
        this.getImageByFoodId(params["foodId"])
        this.deleteFoodForm();
      }
    })
  }


  deleteFoodForm(){
    this.FoodDeleteForm = this.formBuilder.group({
      ID:["",Validators.required]
    });
  }
  getFoodByFoodId(foodId:number){
    this.foodService.getFoodsByFoodId(foodId).subscribe(response=>{
      this.food = response.data;
      const val = Object.values(this.food)
      this.foodID = val[0].yemekID
      this.foodName = val[0].yemekAdi
      this.restID = val[0].restoranID
      this.imgPath = val[0].yemekResim
    })
  }

  getImageByFoodId(id:number){
    this.imgService.getImageByFoodId(id).subscribe(data=>{
      this.img = data.data
    })
  }

  delete(){
    if(this.FoodDeleteForm.valid)
    {
      let foodModel = Object.assign({},this.FoodDeleteForm.value)
      this.foodService.delete(foodModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı");
        this.imgService.delete(this.img[0]).subscribe(data=>{})
        this.router.navigate(["./admin/food/getallbyrestid/"+this.restID])
      }, responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0;i<responseError.error.Errors.length;i++){
            this.toastr.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
          
        }
      });
    }else{
      this.toastr.error("Lütfen eksik alanları doldurun!","Hata!");
    }
    
   }
  }

