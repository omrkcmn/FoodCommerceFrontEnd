import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { OperationClaims } from 'src/app/models/operationClaims';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FoodComponent } from '../food/food.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isUserActive:boolean;
  user:User;
  claims:OperationClaims[]=[];
  claimNames:string;
  restId:number;
  userId:number

  constructor(private userService:UserService, 
    private localStorage:LocalStorageService, public authService:AuthService, private route:ActivatedRoute,
    private router:Router) { 
    
  }

  ngOnInit(): void {
    this.getAuth();
    this.tokenChec();
    this.getClaim(this.authService.userId);
    
    this.userId = this.authService.userId
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

  getRestId(userid:number){
    this.userService.GetRestIdByUserId(userid).subscribe(response=>{
      this.restId = Number(response)
    })
  }

  getAuth(){
    if(this.authService.isAuthenticated()){
        this.isUserActive = true
        let email = this.localStorage.getCurrentUser()
        if(email){
          this.userService.GetByMail(email).subscribe(response=>{
            if(response.success){
              this.user = response.data;
            }
          })
        }
       
    }else{
      this.isUserActive = false
    }
  }

  tokenChec(){
    this.authService.userDetailFromToken();
  }

  logOut(){
    localStorage.removeItem("token")
    window.location.reload()
    this.isUserActive = false;
    this.router.navigate(['./food']);
  }

}
