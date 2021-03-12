import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular modules
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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

// routing
const appRoutes: Routes = [
  {path: '', component: NavbarComponent, children: [
    {path: '', component: HomePageComponent},
    {path: 'add-pay-form', component: AddPayFormComponent}
  ]},
  {path: 'account', component: LoginComponent},
  {path: 'pay-success-invoice', component: PaySuccessInvoiceComponent},
]; 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaySuccessInvoiceComponent,
    LoginComponent,
    AddPayFormComponent,
    HomePageComponent,
    PaymentConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PayFormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
