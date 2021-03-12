import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PayFormService } from 'src/app/services/payform.service';

@Component({
  selector: 'app-payment-confirm-modal',
  templateUrl: './payment-confirm-modal.component.html',
  styleUrls: ['./payment-confirm-modal.component.css']
})
export class PaymentConfirmModalComponent implements OnInit {
  paymentInitiated: boolean;
  inPaymentMode: boolean = false;
  payFormData: any;
  constructor(
    private payFormService: PayFormService,
    private router: Router,
    public dialogRef:  MatDialogRef<PaymentConfirmModalComponent>
  ) { }

  ngOnInit(): void {
    this.payFormData = this.payFormService.payFormData;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.payFormService.paymentDone = false;
  }
  gotoPayInvoice() {
    this.inPaymentMode = true;
    setTimeout(() => {
      this.payFormService.paymentDone = true;
      this.onNoClick();
      this.inPaymentMode = false;
      this.router.navigate(['/pay-success-invoice']);
    }, 5000);
    // this.router.navigate(['/pay-success-invoice']);
  }
}
