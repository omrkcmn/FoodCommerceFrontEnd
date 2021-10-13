import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from 'src/app/models/orderDetail';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order-detail-page',
  templateUrl: './admin-order-detail-page.component.html',
  styleUrls: ['./admin-order-detail-page.component.css']
})
export class AdminOrderDetailPageComponent implements OnInit {

  orders:OrderDetail[]=[]
  constructor(private orderService:OrderService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["restid"],["tamamlama"]){
        this.getOrderDetail(params["restid"],params["tamamlama"]);
      }else{
      }
    })
  }


  getOrderDetail(restId:number,tamamlama:boolean){
    this.orderService.getOrderDetailByRestId(restId,tamamlama).subscribe(response=>{
        this.orders = Object.values(response.data)
    })
}

}
