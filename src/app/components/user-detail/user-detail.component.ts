import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  UserForm: FormGroup;
  user:User[]=[];
  
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,private toastr:ToastrService, private userDetail:UserService, private activatedRoute:ActivatedRoute,
    public auth:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["userId"]){
        this.getUser(params["userId"]);
        this.userForm();
      }
    })
  }

  userForm(){
    this.UserForm = this.formBuilder.group({
      kullaniciAdi: ["",Validators.required],
      kullaniciSoyadi: ["",Validators.required],
      adres: ["",Validators.required],
      il: ["",Validators.required],
      ilce: ["",Validators.required],
      telefon: ["",Validators.required],
      email: ["",Validators.required],
      id:["",Validators.required],
      passwordSalt:["",Validators.required],
      passwordHash:["",Validators.required],
    })
  }

  getUser(id:number){
    this.userDetail.getUserByUserId2(id).subscribe(response=>{
      this.user = response.data;
    })
    
  }

  delete(){
    
  }

  update(user:User){
    if(this.UserForm.valid){
      let userModel = Object.assign({},this.UserForm.value);
      this.userService.update(user).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı");
      },responseError=>{
        this.toastr.success("Güncelendi","Başarılı");
        /*if(responseError.error.Errors.length>0){
          for(let i = 0;i<responseError.error.Errors.length;i++){
            this.toastr.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
          
        }//validation tarafından gelen errorlar.*/
        
      }); }else{
        this.toastr.error("Lütfen eksik alanları doldurun!","Hata!");
      }
  }

  
}
