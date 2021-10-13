import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { FoodImage } from 'src/app/models/foodImage';
import { FoodImageService } from 'src/app/services/food-image.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-update',
  templateUrl: './food-update.component.html',
  styleUrls: ['./food-update.component.css']
})
export class FoodUpdateComponent implements OnInit {

  foodUpdateForm : FormGroup;
  food: Food;
  yemekAdi:string        
  aciklama:string        
  ID:number   
  restoranID:number
  fiyat     :number
  img:FoodImage[]
  constructor(private formBuilder:FormBuilder, 
    private foodService:FoodService,
    private imgService:FoodImageService,
    private toastr:ToastrService,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["foodId"]){
        this.getFoodByFoodId(params["foodId"]);
        this.getImageByFoodId(params["foodId"])
        this.updateFoodForm();
      }else{
        //this.getFood();
      }
    });
  }
  

  /*getFood(){
    this.foodService.getFood().subscribe(response=>{
      this.food = response.data;
    })
  }*/

  getImageByFoodId(id:number){
    this.imgService.getImageByFoodId(id).subscribe(response=>{
      this.img = response.data
    })
  }


  updateFoodForm(){
    this.foodUpdateForm = this.formBuilder.group({
      yemekAdi: ["",Validators.required],
      aciklama:["",Validators.required],
      restoranID:["",Validators.required],
      fiyat:["",Validators.required],
      ID:["",Validators.required],
      
    });
  }

  update(){
    if(this.foodUpdateForm.valid){
      let foodModel = Object.assign({},this.foodUpdateForm.value);
      console.log(foodModel)
      this.foodService.update(foodModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı");
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0;i<responseError.error.Errors.length;i++){
            this.toastr.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
          
        }//validation tarafından gelen errorlar.
        
      }); 
      
    }else{
      this.toastr.error("Lütfen eksik alanları doldurun!","Hata!");
    }
  }

  getFoodByFoodId(foodId:number){
    this.foodService.getFoodsByFoodId(foodId).subscribe(response=>{
      this.food = response.data;
      const value = Object.values(response.data)
      this.yemekAdi = value[0].yemekAdi;
      this.aciklama = value[0].aciklama;
      this.ID = value[0].yemekID;
      this.restoranID = value[0].restoranID;
      this.fiyat = value[0].fiyat;
    })
  }
}
