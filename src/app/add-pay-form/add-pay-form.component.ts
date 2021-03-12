import { Component, OnInit } from '@angular/core';
// this is test
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PayFormService } from '../services/payform.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { PaymentConfirmModalComponent } from '../my-modal/payment-confirm/payment-confirm-modal/payment-confirm-modal.component';

@Component({
  selector: 'app-add-pay-form',
  templateUrl: './add-pay-form.component.html',
  styleUrls: ['./add-pay-form.component.css']
})
export class AddPayFormComponent implements OnInit {
  paymentInitiated: boolean;
  paymentForm: FormGroup;
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
  payTypeOption: string[] = [
    'IMPS',
    'NEFT'
  ];
  filteredBankNames: Observable<string[]>;
  
  constructor(
    private payFormService: PayFormService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.paymentInitiated = this.payFormService.paymentInitiated;
    // payment form
    this.paymentForm = new FormGroup({
      'benefName': new FormControl(null, Validators.required),
      'senderMobNo': new FormControl(null, Validators.required),
      'senderName': new FormControl(null, Validators.required),
      'accountNumber': new FormControl(null, Validators.required),
      'payType': new FormControl('IMPS', Validators.required),
      'ifscCode': new FormControl(null, Validators.required),
      'bankName': new FormControl(null, Validators.required),
      'payAmount': new FormControl(null, Validators.required)
    });
    // filter banklist
    this.filteredBankNames = this.paymentForm.get('bankName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.bankName.filter(bankName => bankName.toLowerCase().indexOf(filterValue) === 0);
  }
  // submit payment form
  onSubmit() {
    // this.paymentInitiated = true;
    // this.payFormService.paymentInitiated = true;
    console.log(this.paymentForm.value);

    this.payFormService.payFormData = {
      benefName: this.paymentForm.value.benefName,
      senderMobNo: this.paymentForm.value.senderMobNo,
      senderName: this.paymentForm.value.senderName,
      accountNumber: this.paymentForm.value.accountNumber,
      payType: this.paymentForm.value.payType,
      ifscCode: this.paymentForm.value.ifscCode,
      bankName: this.paymentForm.value.bankName,
      payAmount: this.paymentForm.value.payAmount,
      payAmountInWords: this.getAmountInWords(),
      todayDate: this.getTodayDate(),
      todayTime: this.getTodayTime(),
      transactionId: this.getTransId(),
      status: 'SUCCESS'
    };
    this.openDialog();
    setTimeout(function() {
      // this.paymentInitiated = false;
      // this.dialog.open(PaymentConfirmModalComponent, {});
    }, 5000);
  }
  gotoPayInfo() {
    this.router.navigate(['/pay-success-invoice']);
  }
  // get today's date
  getTodayDate() {
    let dateObj = new Date();
    let day = String(dateObj.getDate()).padStart(2, '0');
    let month: any = dateObj.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
  }
  // get today's time
  getTodayTime() {
    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var seconds = today.getSeconds();
    // add a zero in front of numbers<10
    minute = this.checkTime(minute);
    seconds = this.checkTime(seconds);
    return `${hour}:${minute}:${seconds}`;

  }
  checkTime(i: any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  // convert number to indian system
	price_in_words(price: any) {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
      dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
      tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
      handle_tens = function(dgt, prevDgt) {
        return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
      },
      handle_utlc = function(dgt, nxtDgt, denom) {
        return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
      };
  
    var str = "",
      digitIdx = 0,
      digit = 0,
      nxtDigit = 0,
      words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
      for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
      }
      str = words.reverse().join("")
    } else str = "";
    return str
  }
  getAmountInWords() {
    let amountInNumber = this.paymentForm.value.payAmount;
    amountInNumber = amountInNumber.replace(/\,/g,"");

    console.log(amountInNumber);
    let amountInWords = this.price_in_words(amountInNumber);
    
    return `${this.paymentForm.value.payAmount} Rs${amountInWords} only`
  }
  // transaction ID
  getTransId() {
    let todayDate = this.getTodayDate().split("-");
    let todayTime = this.getTodayTime().split(":");
    return `${todayDate[2]}${todayDate[1]}${todayDate[0]}${todayTime[2]}${todayTime[1]}${todayTime[0]}`
  }
  // modal
  openDialog(): void {
    const dialogRef = this.dialog.open(PaymentConfirmModalComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
