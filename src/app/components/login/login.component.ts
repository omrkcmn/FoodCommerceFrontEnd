import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  
  constructor(private toastr:ToastrService,
    private formBuilder:FormBuilder, private authService:AuthService,private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm(); 
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value)
      console.log(loginModel);
      this.authService.login(loginModel).subscribe(response=>{
         this.toastr.info("Giriş Yapıldı");
         localStorage.setItem("token",response.data.token);
         window.location.reload();
         
         
      },responseError=>{
        this.toastr.error(responseError.error);
      })
      this.router.navigate(["./food"]);
    }
  }

  getUser(){
      this.userService.GetUser().subscribe(response=>{
        console.log(response.data)
      })
  }

}
