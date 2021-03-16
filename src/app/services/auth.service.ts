import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { 
  BehaviorSubject,
  // Subject,
  throwError 
} from "rxjs";
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

  constructor(
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
        this.token = resData.idToken;
        console.log(this.token);        
        this.handelAunthenntication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }
  private handelAunthenntication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date( new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    // this.userSub.next(user);
    this.user = user;
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
