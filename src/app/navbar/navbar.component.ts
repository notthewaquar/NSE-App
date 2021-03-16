import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  events: string[] = [];
  opened: boolean;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSub = this.authService.user;
    // this.userSub = this.authService.user.subscribe(user => {
    //     this.isAuthenticated = !user ? false : true;
    // });
    this.isAuthenticated = !!this.userSub;
    console.log(this.userSub);
    // this.isAuthenticated = this.userSub ? true : false;
    console.log(this.isAuthenticated);
  }
  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }
}
