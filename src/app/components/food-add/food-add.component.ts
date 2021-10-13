import { getLocaleWeekEndRange } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { OperationClaims } from 'src/app/models/operationClaims';
import { AuthService } from 'src/app/services/auth.service';
import { FoodImageService } from 'src/app/services/food-image.service';
import { FoodService } from 'src/app/services/food.service';
import { RestourantService } from 'src/app/services/restourant.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.css']
})
export class FoodAddComponent implements OnInit {
 
  foodAddForm : FormGroup;
  foods:Food[];
  imageFile : any;
  claimNames:string;
  restId:number;
  yemekAdi:string
  claims:OperationClaims[]=[];
  constructor( private formBuilder:FormBuilder, 
    private imgService:FoodImageService,
    private foodService:FoodService,private router:Router,private toastr:ToastrService,
    private userService:UserService,
    private authService:AuthService ) { }

  ngOnInit(): void {
    this.createFoodAddForm();
    this.getClaim(this.authService.userId)
  }

  getClaim(userId:number){
    this.userService.GetOperationClaims(userId).subscribe(response=>{
      this.claims = response.data;
      
      this.claimNames = this.claims[0].name.toString();
      console.log(this.claimNames)
      if(this.claimNames== 'admin'){
        this.getRestId(this.authService.userId)
      }
    })
  }

  getRestId(userId:number){
    this.userService.GetRestIdByUserId(userId).subscribe(response=>{
      this.restId = Number(response)
    })
  }

  createFoodAddForm(){
    this.foodAddForm = this.formBuilder.group({
      yemekAdi: ["",Validators.required],
      aciklama:["",Validators.required],
      restoranID:["",Validators.required],
      //yemekResim: ["",Validators.required],
      fiyat:["",Validators.required]
    });
  }

  addDefaultImage(){
    
  }
  
  add(){
    if(this.foodAddForm.valid){
      let foodModel = Object.assign({},this.foodAddForm.value);
      this.yemekAdi = foodModel.yemekAdi;
      this.foodService.add(foodModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı");
        ///////
        ///////
        this.router.navigate(['./admin/food/getallbyrestid/'+this.restId]);
      }); 
      
    }else{
      this.toastr.error("Lütfen eksik alanları doldurun!","Hata!");
    }
  }
}


            