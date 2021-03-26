import { Component, OnInit } from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { DataTableDataSource } from 'src/app/data-table/data-table-datasource';
import { DataStorageService } from 'src/app/services/data-storage.service';


@Component({
  selector: 'app-delete-pay-data-modal',
  templateUrl: './delete-pay-data-modal.component.html',
  styleUrls: ['./delete-pay-data-modal.component.css']
})
export class DeletePayDataModalComponent implements OnInit {
  isLoading = false;
  constructor(
    private dataStorageService: DataStorageService,
    public dialogRef:  MatDialogRef<DeletePayDataModalComponent>,
    private router: Router
    // private dataTableDataSource: DataTableDataSource
  ) { }

  ngOnInit(): void {
    // console.log(this.dataTableDataSource.getTableData());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deletePaymentData() {
    this.isLoading = true;
    this.dataStorageService.deletePayData()
      .subscribe(res => {
        this.dataStorageService.openSnackBar(
          'Payment data was successfully deleted',
          'okay');
        this.isLoading = false;
        this.onNoClick();
      });
    // this.router.navigate(['/dashboard/manage-payment']);
  }

}
