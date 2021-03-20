import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { PayModel } from 'src/app/model/payform.model';
import { DataStorageService } from 'src/app/services/data-storage.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.css']
})
export class ManagePaymentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    // 'Benifeciery Name',
    // 'Sender Mobile No.',
    // 'Sender Name',
    // 'Account No.',
    // 'Type',
    // 'IFSC Code',
    // 'Bank Name',
    // 'Amount',
    // 'Date',
    // 'Time',
    // 'Transaction ID',
    // 'Status',
    'index',
    'benefName',
    'senderMobNo',
    'senderName',
    'accountNumber',
    'payType',
    'ifscCode',
    'bankName',
    'payAmount',
    'todayDate',
    'todayTime',
    'transactionId',
    'status',
  ];

  
  allPayData: PayModel[];
  isLoading = false;
  dataSource;

  

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading  = true;
    this.dataStorageService.fetchPayData()
    .subscribe(() => {
      this.allPayData = this.dataStorageService.payFormData;
      console.log(this.allPayData);
      this.isLoading  = false;
      this.dataSource = new MatTableDataSource(this.allPayData);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
