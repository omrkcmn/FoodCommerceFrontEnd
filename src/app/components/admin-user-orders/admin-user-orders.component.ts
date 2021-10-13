import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Food } from 'src/app/models/food';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/orderDetail';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-orders',
  templateUrl: './admin-user-orders.component.html',
  styleUrls: ['./admin-user-orders.component.css']
})
export class AdminUserOrdersComponent implements OnInit {

  foods:Food[]=[]
  users:User[]=[]
  orders:OrderDetail[]=[]
  constructor(private userService:UserService,
    private foodService:FoodService,
    private activatedRoute:ActivatedRoute,
    private orderService:OrderService,
    private toastr:ToastrService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["restId"],["tamamlama"]){
        this.getOrderDetail(params["restId"],params["tamamlama"]);
        //this.getImageByCarId(params["carId"]);
      }else{
        //this.getCars();
        //this.getImages();
      }
    })
  }

  getOrderDetail(restId:number,tamamlama:boolean){
      this.orderService.getOrderDetailByRestId(restId,tamamlama).subscribe(response=>{
          this.orders = Object.values(response.data)
      })
  }

  orderSend(order:OrderDetail){
    var orderUser = new Order()
    orderUser.id = order.id
    orderUser.kullaniciID = order.kullaniciID
    orderUser.miktar = order.miktar
    orderUser.restoranID = order.restoranID
    orderUser.siparisDurum = "Adrese Gönderildi"
    orderUser.tamamlandimi = false
    orderUser.yemekID = order.yemekID
    this.orderService.updateOrder(orderUser).subscribe(response=>{
      this.toastr.success("Ürün Yola Çıktı")
      window.location.reload()
    })
  }


  btnClass(){
    return "btn btn-primary"
  }

  refresh(){
    window.location.reload()
  }
  orderComplete(order:OrderDetail){
    var orderUser = new Order()
    orderUser.id = order.id
    orderUser.kullaniciID = order.kullaniciID
    orderUser.miktar = order.miktar
    orderUser.restoranID = order.restoranID
    orderUser.siparisDurum = "teslim edildi"
    orderUser.tamamlandimi = true
    orderUser.yemekID = order.yemekID
    this.orderService.updateOrder(orderUser).subscribe(response=>{
      this.toastr.success("Ürün Teslim Edildi")
      window.location.reload()
    })
  }
}
