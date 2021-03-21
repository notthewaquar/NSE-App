import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular modules
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// http client
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// custom material module
import { CustomMaterialModule } from './core/material.module';
// services
import { PayFormService } from './services/payform.service';
// component
import { NavbarComponent } from './navbar/navbar.component';
import { PaySuccessInvoiceComponent } from './pay-success-invoice/pay-success-invoice.component';
import { LoginComponent } from './login/login.component';
import { AddPayFormComponent } from './add-pay-form/add-pay-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PaymentConfirmModalComponent } from './my-modal/payment-confirm/payment-confirm-modal/payment-confirm-modal.component';
import { AuthGuard } from './login/auth.guard';
// dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './dashboard/manage-form/manage-form.component';
import { DashMenuComponent } from './dashboard/dash-menu/dash-menu.component';
import { ManagePaymentComponent } from './dashboard/manage-payment/manage-payment.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { AuthInterceptorSerivce } from './login/auth-interceptor.service';

// routing
const appRoutes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
      {path: 'add-pay-form', component: AddPayFormComponent, canActivate: [AuthGuard]},
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '', component: DashMenuComponent},
          {path: 'manage-form', component: ManageComponent},
          {path: 'manage-payment', component: ManagePaymentComponent}
        ]
      },
    ]
  },
  {path: 'account', component: LoginComponent},
  {path: 'pay-success-invoice', component: PaySuccessInvoiceComponent, canActivate: [AuthGuard]}
]; 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaySuccessInvoiceComponent,
    LoginComponent,
    AddPayFormComponent,
    HomePageComponent,
    PaymentConfirmModalComponent,
    // dashboard
    DashboardComponent,
    DashMenuComponent,
    ManageComponent,
    ManagePaymentComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    PayFormService
    // ,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorSerivce,
    //   multi: true
    // }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
