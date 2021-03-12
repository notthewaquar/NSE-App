import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayFormService } from '../services/payform.service';

@Component({
  selector: 'app-pay-success-invoice',
  templateUrl: './pay-success-invoice.component.html',
  styleUrls: ['./pay-success-invoice.component.css']
})
export class PaySuccessInvoiceComponent implements OnInit {
  payFormData: any;
  paymentDone: boolean = true;

  constructor(
    private payFormService: PayFormService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.paymentDone = this.payFormService.paymentDone;
    console.log(this.paymentDone);

    this.payFormData = this.payFormService.payFormData;
    console.log(this.payFormData);
    if (
      this.payFormData === undefined
    ) {
      this.paymentDone = false;
    }
  }
  gotoPayForm() {
    this.router.navigate(['/add-pay-form']);
  }
  
}
