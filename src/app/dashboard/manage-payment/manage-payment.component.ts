import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.css']
})
export class ManagePaymentComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
