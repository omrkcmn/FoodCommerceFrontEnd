import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { FoodComponent } from './components/food/food.component';
import { FoodAddComponent } from './components/food-add/food-add.component';
import { RestAddComponent } from './components/rest-add/rest-add.component';
import { ImgAddComponent } from './components/img-add/img-add.component';
import { FoodUpdateComponent } from './components/food-update/food-update.component';
import { FoodDeleteComponent } from './components/food-delete/food-delete.component';
import { RestUpdateComponent } from './components/rest-update/rest-update.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { RestourantComponent } from './components/restourant/restourant.component';
import { AdminUserOrdersComponent } from './components/admin-user-orders/admin-user-orders.component';
import { AdminFoodListComponent } from './components/admin-food-list/admin-food-list.component';
import { AdminOrderDetailPageComponent } from './components/admin-order-detail-page/admin-order-detail-page.component';
import { RestourantCommentComponent } from './components/restourant-comment/restourant-comment.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:FoodComponent},
  {path:"food",component:FoodComponent},
  {path:"food/foodname/:foodname/restname/:restname",component: FoodComponent},
  {path:"food/getFoodsByFoodId/:carId",component:FoodDetailComponent},
  {path:"admin/food/add", component:FoodAddComponent, canActivate:[LoginGuard]},
  {path:"rest/add", component:RestAddComponent, canActivate:[LoginGuard]},
  {path:"img/add/:foodId",component:ImgAddComponent, canActivate:[LoginGuard]},
  {path:"admin/food/update/:foodId", component:FoodUpdateComponent, canActivate:[LoginGuard]},
  {path:"admin/food/getallbyrestid/:restId", component:AdminFoodListComponent, canActivate:[LoginGuard]},
  {path:"admin/food/delete/:foodId",component:FoodDeleteComponent, canActivate:[LoginGuard]},
  {path:"rest/update/:restId",component:RestUpdateComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"admin/orderdetailpage/:restid/:tamamlama",component:AdminOrderDetailPageComponent,canActivate:[LoginGuard]},
  {path:"user/detail/:userId",component:UserDetailComponent,canActivate:[LoginGuard]},
  {path:"user/register",component:RegisterComponent},
  {path:"admin",component:AdminComponent,canActivate:[LoginGuard]},
  {path:"admin/food/getall/:restId",component:AdminFoodListComponent},
  {path:"user/cart/:userId",component:CartComponent, canActivate:[LoginGuard]},
  {path:"user/orderdetail/:userId/:tamamlanma",component:OrderComponent, canActivate:[LoginGuard]},
  {path:"admin/restoran/:restId",component:RestourantComponent, canActivate:[LoginGuard]},
  {path:"admin/siparisler/:restId/:tamamlama",component:AdminUserOrdersComponent, canActivate:[LoginGuard]},
  {path:"food/add",component:FoodAddComponent, canActivate:[LoginGuard]},
  {path:"admin/restoran/restoranDetail/:restId",component:AdminComponent, canActivate:[LoginGuard]},
  {path:"admin/restoran/userorders/:restId",component:AdminUserOrdersComponent, canActivate:[LoginGuard]},
  {path:"cartsummary",component:CartSummaryComponent},
  {path:"rest/restdetail/:restId",component:FoodComponent},
  {path:"rest/comments/:restourantid",component:RestourantCommentComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
