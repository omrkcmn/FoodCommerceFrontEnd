import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestourantService } from 'src/app/services/restourant.service';

@Component({
  selector: 'app-rest-add',
  templateUrl: './rest-add.component.html',
  styleUrls: ['./rest-add.component.css']
})
export class RestAddComponent implements OnInit {

  restAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private toastr:ToastrService,private restService:RestourantService) { }

  ngOnInit(): void {
    this.createRestAddForm();
  }

  createRestAddForm(){
    this.restAddForm = this.formBuilder.group({
      restoranAdi: ["",Validators.required],
      restoranAdresi: ["",Validators.required],
      il:["",Validators.required],
      ilce: ["",Validators.required],
      mahalle: ["",Validators.required]
    })
  }

  add(){
    if(this.restAddForm.valid){
      let restModel = Object.assign({},this.restAddForm.value);
      this.restService.add(restModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı");
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0;i<responseError.error.Errors.length;i++){
            this.toastr.error(responseError.error.Error[i].ErrorMessage,"Hata!")
          }
        }
      })
    }else{
      this.toastr.error("Lütfen eksik alanları doldurun!","Hata!");
    }
  }

}
