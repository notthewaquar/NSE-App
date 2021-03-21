import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-dash-menu',
  templateUrl: './dash-menu.component.html',
  styleUrls: ['./dash-menu.component.css']
})
export class DashMenuComponent implements OnInit {
  bankData = [];
  payData = [];
  totalPaid = 0;
  bankLoading = false;
  payLoading = false;
  totalLoading = false;
  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bankLoading = false;
    this.payLoading = false;
    this.totalLoading = false;
    this.dataStorageService.fetchBankName()
      .subscribe(() => {
        this.bankData = this.dataStorageService.bankName;
        this.bankLoading = true;
      });
    this.dataStorageService.fetchPayData()
      .subscribe(() => {
        this.payData = this.dataStorageService.payFormData;
        this.payLoading = true;
        this.totalPaid = this.calcTotalPayment();
        this.totalLoading = true;
        
      });
  }
  gotoManageBank() {
    this.router.navigate(['/dashboard/manage-form']);
  }
  gotoManagePayment() {
    this.router.navigate(['/dashboard/manage-payment']);
  }
  calcTotalPayment() {
    let amount = 0;
    for (let k in this.payData) {
      amount += +this.payData[k].payAmount;
    }
    var x: any = amount;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    amount = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return amount;
  }
}
