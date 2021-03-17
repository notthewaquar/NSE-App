import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-menu',
  templateUrl: './dash-menu.component.html',
  styleUrls: ['./dash-menu.component.css']
})
export class DashMenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  gotoManageBank() {
    this.router.navigate(['/dashboard/manage-form']);
  }
  gotoManagePayment() {
    this.router.navigate(['/dashboard/manage-payment']);
  }
}
