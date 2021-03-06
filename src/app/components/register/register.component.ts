import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastr:ToastrService,
    private route:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName: ["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      //yemekResim: ["",Validators.required],
      password:["",Validators.required]
    });
  }

  register(){
    if(this.registerForm.valid){
      let user = Object.assign({},this.registerForm.value);
      this.authService.register(user).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı");
        this.route.navigate(["./login"])
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

}
