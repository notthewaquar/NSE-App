import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.css']
})
export class ManageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
