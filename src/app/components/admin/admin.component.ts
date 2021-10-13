import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/models/food';
import { FoodDetail } from 'src/app/models/foodDetail';
import { Restourant } from 'src/app/models/restourant';
import { FoodDetailService } from 'src/app/services/food-detail.service';
import { RestourantService } from 'src/app/services/restourant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  foods:Food[]=[];
  rests:Restourant[] = [];
  AdminForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private foodDetailService:FoodDetailService, 
    private restService:RestourantService, private activatedRoute:ActivatedRoute,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["restId"]){
        this.getAllByRestId(params["restId"]);
        this.adminForm()
      }
    })
  }

  adminForm(){
    this.AdminForm = this.formBuilder.group({
      il: ["",Validators.required],
      ilce: ["",Validators.required],
      id: ["",Validators.required],
      mahalle: ["",Validators.required],
      restoranAdi: ["",Validators.required],
      restoranAdresi:["",Validators.required]
    })
  }



  update(rest:Restourant){
    this.restService.update(rest).subscribe(response=>{
      this.toastr.success("Güncellendi");
      window.location.reload()
    })
  }


  getAllByRestId(id:number){
    this.restService.getRestsByRestId(id).subscribe(response=>{
        this.rests = response.data
    })
  }


}

