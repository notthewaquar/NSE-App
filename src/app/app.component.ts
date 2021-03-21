import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nse-app';
  
  constructor(
    private authService: AuthService,
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
  ngOnInit() {
    this.authService.autoLogin();
  }

}
