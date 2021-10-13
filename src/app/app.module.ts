import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { RestourantComponent } from './components/restourant/restourant.component';
import { FoodComponent } from './components/food/food.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FoodDetailComponent } from './components/food-detail/food-detail.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { FilterControlPipe } from './pipes/filter-control.pipe';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { FoodAddComponent } from './components/food-add/food-add.component';
import { RestAddComponent } from './components/rest-add/rest-add.component';
import { ImgAddComponent } from './components/img-add/img-add.component';
import { FoodUpdateComponent } from './components/food-update/food-update.component';
import { FoodDeleteComponent } from './components/food-delete/food-delete.component';
import { RestUpdateComponent } from './components/rest-update/rest-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { AdminUserOrdersComponent } from './components/admin-user-orders/admin-user-orders.component';
import { AdminFoodListComponent } from './components/admin-food-list/admin-food-list.component';
import { AdminOrderDetailPageComponent } from './components/admin-order-detail-page/admin-order-detail-page.component';
import { RestListComponent } from './components/rest-list/rest-list.component';
import { RestListPipe } from './pipes/rest-list.pipe';
import { RestourantCommentComponent } from './components/restourant-comment/restourant-comment.component';
import {NgxPaginationModule} from 'ngx-pagination'
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    RestourantComponent,
    FoodComponent,
    CustomerComponent,
    FoodDetailComponent,
    MainComponentComponent,
    FilterControlPipe,
    CartSummaryComponent,
    FoodAddComponent,
    RestAddComponent,
    ImgAddComponent,
    FoodUpdateComponent,
    FoodDeleteComponent,
    RestUpdateComponent,
    LoginComponent,
    UserDetailComponent,
    RegisterComponent,
    AdminComponent,
    CartComponent,
    FooterComponent,
    OrderComponent,
    AdminUserOrdersComponent,
    AdminFoodListComponent,
    AdminOrderDetailPageComponent,
    RestListComponent,
    RestListPipe,
    RestourantCommentComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-right"
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
