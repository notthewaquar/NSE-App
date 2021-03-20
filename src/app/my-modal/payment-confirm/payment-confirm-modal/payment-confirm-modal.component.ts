import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PayModel } from 'src/app/model/payform.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { PayFormService } from 'src/app/services/payform.service';

@Component({
  selector: 'app-payment-confirm-modal',
  templateUrl: './payment-confirm-modal.component.html',
  styleUrls: ['./payment-confirm-modal.component.css']
})
export class PaymentConfirmModalComponent implements OnInit {
  // paymentInitiated: boolean;
  inPaymentMode: boolean = false;
  payFormData: PayModel;
  redirectToInvoice: boolean = false;
  // redirectCount: number = 0;
  redirectCountDown: number = 5;
  
  constructor(
    private dataStorageService: DataStorageService,
    private payFormService: PayFormService,
    private router: Router,
    public dialogRef:  MatDialogRef<PaymentConfirmModalComponent>
  ) { }

  ngOnInit(): void {
    this.payFormData = this.payFormService.payFormData;
    console.log(this.payFormData);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.payFormService.paymentDone = false;
  }
  gotoPayInvoice() {
    this.dataStorageService.storePayData(this.payFormData)
    .subscribe(() => {
      this.dataStorageService.openSnackBar('Payment done successfully', 'Okay');
    });
    this.inPaymentMode = true;
    setTimeout(() => {
      this.payFormService.paymentDone = true;
      this.inPaymentMode = false;
      this.redirectToInvoice = true;
      // this.startRedirectCount();
      this.startRedirectCountDown();
    }, 5000);
    setTimeout(() => {
      this.onNoClick();
      this.redirectToInvoice = false;
      this.router.navigate(['/pay-success-invoice']);      
    }, 10000);
  }
  // startRedirectCount() {
  //   var refreshIntervalId = setInterval(() => {
  //     this.redirectCount += 5;
  //     if (this.redirectCount >= 100) {
  //       clearInterval(refreshIntervalId);
  //     }
  //   }, 200);    
  // }
  startRedirectCountDown() {
    var refreshIntervalId = setInterval(() => {
      this.redirectCountDown -= 1;
      if (this.redirectCountDown <= 0) {
        clearInterval(refreshIntervalId);
      }
    }, 800);
  }

}
