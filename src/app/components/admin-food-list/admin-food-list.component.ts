import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-admin-food-list',
  templateUrl: './admin-food-list.component.html',
  styleUrls: ['./admin-food-list.component.css']
})
export class AdminFoodListComponent implements OnInit {

  foods:Food[]=[];
  foodsByDetails:FoodDetail[]=[];
  foodId:number
  constructor(private foodService:FoodService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["restId"]){
        this.getallbyrestid(params["restId"]);
      }else{
        
      }
    });
  }

  getallbyrestid(id:number){
    this.foodService.getFoodByRestId(id).subscribe(response=>{
      this.foodsByDetails = response.data
    })
  }

}
