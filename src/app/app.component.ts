import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nse-app';

  constructor(
    private router: Router
  ) { }

  gotoAccountPage() {
    this.router.navigate(['/account']);
  }
  gotoHomePage() {
    this.router.navigate(['/add-pay-form']);
  }
  gotoPayInvoice() {
    this.router.navigate(['/pay-success-invoice']);
  }  
}
