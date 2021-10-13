import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { Restourant } from 'src/app/models/restourant';
import { RestourantService } from 'src/app/services/restourant.service';
@Component({
  selector: 'app-rest-update',
  templateUrl: './rest-update.component.html',
  styleUrls: ['./rest-update.component.css']
})
export class RestUpdateComponent implements OnInit {

  restUpdateForm : FormGroup;
  rest: Restourant[] = [];
  constructor(private formBuilder:FormBuilder, 
    private restService:RestourantService,
    private toastr:ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["restId"]){
        this.getRestByRestId(params["restId"]);
        this.updateRestForm();
      }else{
        this.getRest();
      }
    });
  }

  getRest(){
    this.restService.getRestourants().subscribe(response=>{
      this.rest = response.data;
    })
  }

  updateRestForm(){
    this.restUpdateForm = this.formBuilder.group({
      restoranAdi: ["",Validators.required],
      restoranAdresi:["",Validators.required],
      il:["",Validators.required],
      ilce:["",Validators.required],
      mahalle:["",Validators.required],
      ID:["",Validators.required]
    });
  }

  update(){
    if(this.restUpdateForm.valid){
      let foodModel = Object.assign({},this.restUpdateForm.value);
      this.restService.update(foodModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı");
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for(let i = 0;i<responseError.error.Errors.length;i++){
            this.toastr.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
          
        }
        
      }); 
      
    }else{
      this.toastr.error("Lütfen eksik alanları doldurun!","Hata!");
    }
  }

  getRestByRestId(restId:number){
    this.restService.getRestsByRestId(restId).subscribe(response=>{
      this.rest = response.data;
      console.log(response.data)
    })
  }

}
