import { Component, OnInit } from '@angular/core';
// this is test
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-pay-form',
  templateUrl: './add-pay-form.component.html',
  styleUrls: ['./add-pay-form.component.css']
})
export class AddPayFormComponent implements OnInit {
  myBankNameControl = new FormControl();
  bankName: string[] = [
    'Bank of Baroda',
    'Bank of India',
    'Bank of Maharashtra',
    'Canara Bank',
    'Indian Bank',
    'Indian Overseas Bank',
    'Punjab and Sind Bank',
    'Punjab National Bank',
    'State Bank of India',
    'UCO Bank',
    'Union Bank of India'
  ];
  filteredBankNames: Observable<string[]>;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.filteredBankNames = this.myBankNameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.bankName.filter(bankName => bankName.toLowerCase().indexOf(filterValue) === 0);
  }
  gotoPayInfo() {
    this.router.navigate(['/pay-success-invoice']);
  }
}
