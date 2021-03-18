import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResonseData } from '../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataStorageService } from '../services/data-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  allowedUser = [
    'ashraf@nsentreprise.com',
    'admin@gmail.com',
    'gulnaz19angle@gmail.com'
  ]
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
  }
  
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (
      !form.valid
    ) {
      return;
    }
    // console.log(form.value);
    const email = form.value.email;
    console.log(email);
    console.log(this.allowedUser);
    console.log(this.allowedUser.includes(email));
    
    if (
      !this.allowedUser.includes(email)
    ) {
      this.openSnackBar('This is not a registered user', 'okay');
      return;
    }
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResonseData>

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      // authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      // only for logged in
      this.dataStorageService.fetchBankName();
      this.gotoHomePage();
    }, errorMessage => {
      console.log(errorMessage);
      this.openSnackBar(errorMessage, 'Close')
      this.isLoading = false;
    });
    
    form.reset();

  }
  gotoHomePage() {
    this.router.navigate(['']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}
