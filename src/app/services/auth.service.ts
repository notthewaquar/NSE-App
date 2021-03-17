import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { 
  BehaviorSubject,
  // Subject,
  throwError 
} from "rxjs";
import { Router } from "@angular/router";

import { User } from "../model/user.model";

export interface  AuthResonseData {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  userSub = new BehaviorSubject<User>(null);
  user:any;
  token: string = null;
  private tokenExpirationTimer: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }
  
  signup(email: string, password: string) {
    return this.http.post<AuthResonseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6X9JxnmFX4jYt_7xWQiUsnDimG3wbjxA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.errorHandler),
      tap(resData => {
        this.handelAunthenntication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }
  login(email: string, password: string) {
    return this.http.post<AuthResonseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6X9JxnmFX4jYt_7xWQiUsnDimG3wbjxA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.errorHandler),
      tap(resData => {
        // console.log(this.token);        
        this.handelAunthenntication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  autoLogin() {
    const UserData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('UserData'));
    if (!UserData) {
      return;
    }

    const loadedUser = new User(
      UserData.email,
      UserData.id,
      UserData._token,
      new Date(UserData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user = loadedUser;
      this.login(this.user.email,this.user.password);
      this.token = loadedUser.token;
      const expirationDuration = new Date(UserData._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  logout(accPage: boolean) {
    this.user = null;
    if (accPage) {
      this.router.navigate(['/account']);
      localStorage.removeItem('UserData');
    }
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout(false);
      console.log('Auto login called');
      console.log(expirationDuration);
      this.autoLogin();
    // }, 5000);
    }, expirationDuration);
  }
  private handelAunthenntication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    this.token = token;

    let expirationDate = new Date( new Date().getTime() + expiresIn * 1000);
    console.log(expirationDate);
    // expirationDate = expirationDate.toLocaleString('en-US', { timeZone: 'Asia/Calcutta' })

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    // this.userSub.next(user);
    this.autoLogout(expiresIn * 1000);
    this.user = user;

    localStorage.setItem('UserData', JSON.stringify(user));
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage: string = 'An unkonwn Error Occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        // break;
    }
    return throwError(errorMessage);
  }
}
// AIzaSyB6X9JxnmFX4jYt_7xWQiUsnDimG3wbjxA
