import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(
    private router: Router,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    // this.dataStorageService.fetchBankName();
  }
  
  managePage() {
    this.router.navigate(['/dashboard/manage-form']);
  }
}
