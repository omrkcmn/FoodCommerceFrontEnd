import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodImage } from 'src/app/models/foodImage';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { FoodImageService } from 'src/app/services/food-image.service';
import { FoodService } from 'src/app/services/food.service';


@Component({
  selector: 'app-img-add',
  templateUrl: './img-add.component.html',
  styleUrls: ['./img-add.component.css']
})
export class ImgAddComponent implements OnInit {
  defaultPath = 'https://localhost:44334';
  imgAddForm:FormGroup;
  imgs:FoodImage[] = [];
  yemekID: number;
  imageFile : any;
  images : FoodImage[] = [];
  yemek: Food;
  yemekler:FoodDetail[];
  yemekAdi:string
  restId:number

  constructor(private foodService:FoodService, 
    private activatedRoute: ActivatedRoute, 
    private router:Router,
    private formBuilder:FormBuilder, private toastr:ToastrService,
    private imgService:FoodImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["foodId"]){
        this.yemekID = params["foodId"]
        this.getFoodByFoodId(params["foodId"])
        this.getImagesByFoodId(params["foodId"])
      }else{
        
      }
    });
  }

  getFoodByFoodId(foodId:number){
    this.foodService.getFoodsByFoodId(foodId).subscribe((response)=>{
      this.yemek=response.data
      const values = Object.values(response.data);
      this.yemekAdi = values[0].yemekAdi;
      this.restId = values[0].restoranID
    })
  }
  getImagesByFoodId(carId:number){
    this.imgService.getImageByFoodId(carId).subscribe((response)=>{
      this.images=response.data
    })

  }

  add(){
    const image: FormData = new FormData();
    image.append('yemekID',this.yemekID.toString());
    image.append("Image",this.imageFile,this.imageFile.name);
    this.imgService.add( image ).subscribe(response=>{
      this.toastr.success(response.message)
      this.router.navigate(["./admin/food/getallbyrestid/"+this.restId])
    },responseError=>{
      this.toastr.error(responseError.error.message)
    })
  }
  fileSelected(event:any) {
    this.imageFile = event.target.files[0]
    event.target.nextElementSibling.innerText=this.imageFile.name
  }
}

