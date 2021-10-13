import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { FoodDetail } from 'src/app/models/foodDetail';
import { OrderDetail } from 'src/app/models/orderDetail';
import { AuthService } from 'src/app/services/auth.service';
import { FoodDetailService } from 'src/app/services/food-detail.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderDetails:OrderDetail[]=[];
  teslimDurum:boolean
  comment:Comment;
  star:number
  commentAddForm : FormGroup;
  restID:number
  
  constructor(private orderService:OrderService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService,
    private formBuilder:FormBuilder,
    private commentService:CommentService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["userId"],["tamamlanma"]){
        this.getOrderDetail(params["userId"],params["tamamlanma"]);
        this.createCommentAddForm()
      }else{
        //this.getCars();
        //this.getImages();
      }
    })
  }

  createCommentAddForm(){
    this.commentAddForm = this.formBuilder.group({
      restoranID: ["",Validators.required],
      yorum:["",Validators.required],
    });
  }

  addComment(){
      if(this.commentAddForm.valid){
        var foodModel = Object.assign({},this.commentAddForm.value);
        foodModel.puan = this.star
        
        this.commentService.add(foodModel).subscribe(response=>{
          this.toastr.success("Yorumunuz Eklendi")
        })
      }
  }

  stars(id:number){
    this.star = id
  }

  get toplam()
  {
    return this.orderDetails.reduce((sum,x)=>
    ({quantity:1,
      priceWhenBought:sum.priceWhenBought+x.fiyat*x.miktar}),
    {quantity:1,priceWhenBought:0}).priceWhenBought;
  }

  getOrderDetail(userId:number,tamamlandimi:boolean){
    this.orderService.getOrderDetail(userId,tamamlandimi).subscribe(response=>{
      this.orderDetails = response.data;
    })
  }

  pastOrders(userId:number,tamamlandimi:boolean){
    this.orderService.getOrderDetail(userId,tamamlandimi).subscribe(response=>{
      this.orderDetails = response.data;
      this.restID = this.orderDetails[0].restoranID
    })
  }

}
