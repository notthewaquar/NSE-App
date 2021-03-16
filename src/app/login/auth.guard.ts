import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  // canActivate (
  //   route: ActivatedRouteSnapshot,
  //   router: RouterStateSnapshot
  // ): boolean | Promise<boolean  | Observable<boolean> {
  //   return !!this.authService.user;
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = !!this.authService.user;
    if (isAuth) {
      return true;
    }
    return this.router.createUrlTree(['/account']);
  }
}