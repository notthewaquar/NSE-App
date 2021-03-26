import {
  Component,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.css']
})
export class ManagePaymentComponent implements OnInit {
  isLoading = false;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}