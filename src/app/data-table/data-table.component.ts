import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PayModel } from '../model/payform.model';
import { DataStorageService } from '../services/data-storage.service';
import { DataTableDataSource } from './data-table-datasource';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DeletePayDataModalComponent } from '../my-modal/delete-pay-data-modal/delete-pay-data-modal.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PayModel>;
  dataSource: DataTableDataSource = new DataTableDataSource();
  isLoading = false;
  constructor(
    public dialog: MatDialog,
    private dataStorageService: DataStorageService
  ) {}

  displayedColumns = [
    'index',
    'benefName',
    'senderMobNo',
    'senderName',
    'accountNumber',
    'payType',
    'ifscCode',
    'bankName',
    'payAmountInWords',
    'todayDate',
    'todayTime',
    'transactionId',
    'status',
    'delete',
  ];

  ngOnInit() {
    this.isLoading = true;
    this.dataStorageService.fetchPayData()
      .subscribe(() => {
        // this.dataSource = new DataTableDataSource();
        console.log(this.dataStorageService.payFormData);
        console.log(this.dataSource);
        this.dataSource.data = this.dataStorageService.payFormData;

        // this.dataSource = new DataTableDataSource();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
        this.isLoading = false;
      });
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
  onDeletePayData(delId: string) {
    this.dataSource.data.splice(10,1);
    // console.log(this.dataSource.data);
    // return;
    this.openDialog();
    // console.log(delId);
    this.dataStorageService.deletePaymentId = delId;
    // this.dataStorageService.deletePayData(delId)
    //   .subscribe(res => {
    //     // console.log(res);
    //   });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      DeletePayDataModalComponent,
      // {disableClose: true}
    );

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  // applyFilter(filterValue: string) { 
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
