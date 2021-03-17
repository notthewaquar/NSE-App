import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bankName: string[];
  fullBankNames = '';
  isLoading = false;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    this.bankName = this.dataStorageService.bankName;
    this.fullBankNames = '';
    for (let i = 0; i < this.bankName.length; i++) {
      this.fullBankNames += `${this.bankName[i]}\n`;
    }
  }
  updateBankNames(bankList: string) {
    var arrayOfLines = bankList.split('\n');
    
    this.dataStorageService.storeBankName(arrayOfLines);
  }
  fetchBankNames() {
    this.dataStorageService.fetchBankName();
  }
  managePage() {
    this.router.navigate(['/dashboard/manage-form']);
  }
}
