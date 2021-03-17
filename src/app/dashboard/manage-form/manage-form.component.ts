import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.css']
})
export class ManageComponent implements OnInit {
  bankName: string[];
  fullBankNames = '';
  isLoading = false;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    // this.addBankNamesToForm();
    // this.dataStorageService.fetchBankName();
    this.fetchBankName();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
  addBankNamesToForm() {
    this.fullBankNames = '';
    for (let i = 0; i < this.bankName.length; i++) {
      if (this.bankName[i] != '') {
        this.fullBankNames += `${this.bankName[i]}\n`;
      }
    }
  }
  updateBankNames(bankList: string) {
    this.isLoading = true;
    var arrayOfLines = bankList.split('\n');    
    this.dataStorageService.storeBankName(arrayOfLines)
    .subscribe(() => {
      this.isLoading = false;
      this.dataStorageService.openSnackBar('Bank Name updated successfully', 'Okay');
      this.fetchBankName();
    });
  }
  fetchBankName() {
    this.isLoading = true;
    this.dataStorageService.fetchBankName()
      .subscribe( () => {
        this.isLoading = false;
        this.bankName = this.dataStorageService.bankName;
        console.log(this.bankName);
        this.addBankNamesToForm();
        this.dataStorageService.openSnackBar('Bank Name list fetched successfully', 'Okay');
      }
    );
  }
}
