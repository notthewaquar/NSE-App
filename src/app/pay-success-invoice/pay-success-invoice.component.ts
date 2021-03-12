import { Component, OnInit } from '@angular/core';
import { PayFormService } from '../services/payform.service';

@Component({
  selector: 'app-pay-success-invoice',
  templateUrl: './pay-success-invoice.component.html',
  styleUrls: ['./pay-success-invoice.component.css']
})
export class PaySuccessInvoiceComponent implements OnInit {
  payFormData: any;

  constructor(
    private payFormService: PayFormService
  ) { }

  ngOnInit(): void {
    this.payFormData = this.payFormService.payFormData;
    console.log(this.payFormData);    
  }

}
