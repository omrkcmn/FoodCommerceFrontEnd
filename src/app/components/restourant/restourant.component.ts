import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { Restourant } from 'src/app/models/restourant';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';
import { RestourantService } from 'src/app/services/restourant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restourant',
  templateUrl: './restourant.component.html',
  styleUrls: ['./restourant.component.css']
})
export class RestourantComponent implements OnInit {

  restourants: Restourant[] = [];

  foods: FoodDetail[];

  
  restId:number;

  currentRestourant: Restourant;

  constructor(private restourantService: RestourantService, private activatedRoute:ActivatedRoute,
  private foodService:FoodService,
  public authService:AuthService,
  private userService:UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["restId"]){
        this.getRestId(this.authService.userId);
        this.getFoods(params["restId"]);
      }else{
      }
    });
  }

  getRestId(userid:number){
    this.userService.GetRestIdByUserId(userid).subscribe(response=>{
        this.restId = Number(response)
    })
  }
  getFoods(id:number){
    this.foodService.getFoodByRestId(id).subscribe(response=>{
      this.foods = response.data
    })
  }

  

}
