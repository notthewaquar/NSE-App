import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';
import { PayModel } from 'src/app/model/payform.model';
import { DataStorageService } from 'src/app/services/data-storage.service';

// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
// import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.css']
})
export class ManagePaymentComponent implements OnInit, AfterViewInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // displayedColumns: string[] = [
  //   'index',
  //   'benefName',
  //   'senderMobNo',
  //   'senderName',
  //   'accountNumber',
  //   'payType',
  //   'ifscCode',
  //   'bankName',
  //   'payAmountInWords',
  //   'todayDate',
  //   'todayTime',
  //   'transactionId',
  //   'status',
  //   'delete',
  // ];

  
  // allPayData: PayModel[] = [];
  isLoading = false;
  // dataSource = new MatTableDataSource(this.allPayData);

  

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.isLoading  = true;
    // this.dataStorageService.fetchPayData()
    // .subscribe(() => {
    //   this.allPayData = this.dataStorageService.payFormData;
    //   console.log(this.allPayData);
    //   this.isLoading  = false;
    //   console.log('onInit');
      
    //   this.dataSource = new MatTableDataSource(this.allPayData);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }
  ngAfterViewInit() {
    console.log('afterInit');
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  goBack() {
    this.router.navigate(['/dashboard']);
  }
  // onDeletePayData(delId: string) {
  //   this.dataStorageService.deletePaymentId = delId;
  // }
}
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