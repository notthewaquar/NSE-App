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
  // paymentInitiated: boolean;
  paymentForm: FormGroup;
  bankName: string[] = [
    'Bank of Baroda','Bank of India','Bank of Maharashtra','Canara Bank','Central Bank of India','Indian Bank','Indian Overseas Bank','Punjab and Sind Bank','Punjab National Bank','State Bank of India','UCO Bank','Union Bank of India','Axis Bank','Bandhan Bank','CSB Bank','City Union Bank','DCB Bank','Dhanlaxmi Bank','Federal Bank','HDFC Bank','ICICI Bank','IDBI Bank','IDFC First Bank','IndusInd Bank','Jammu & Kashmir Bank','Karnataka Bank','Karur Vysya Bank','Kotak Mahindra Bank','Nainital Bank','RBL Bank','South Indian Bank','Tamilnad Mercantile Bank','Yes Bank','Andhra Pradesh Grameena Vikas Bank','Arunachal Pradesh Rural Bank','Assam Gramin Vikash Bank','Dakshin Bihar Gramin Bank','Chhattisgarh Rajya Gramin Bank','Baroda Gujarat Gramin Bank','Sarva Haryana Gramin Bank','Himachal Pradesh Gramin Bank','Ellaquai Dehati Bank','Jharkhand Rajya Gramin Bank','Karnataka Gramin Bank','Kerala Gramin Bank','Madhya Pradesh Gramin Bank','Maharashtra Gramin Bank','Manipur Rural Bank','Meghalaya Rural Bank','Mizoram Rural Bank','Nagaland Rural Bank','Odisha Gramya Bank','Puduvai Bharathiar Grama Bank','Punjab Gramin Bank','Rajasthan Marudhara Gramin Bank','Tamil Nadu Grama Bank','Telangana Grameena Bank','Tripura Gramin Bank','Aryavart Bank','Uttarakhand Gramin Bank','Bangiya Gramin Vikash Bank','AB Bank','Abu Dhabi Commercial Bank','American Express','Australia and New Zealand Banking Group','Barclays Bank Plc','Bank of America','Bank of Bahrain and Kuwait','Bank of Ceylon','Bank of China','Bank of Nova Scotia','BNP Paribas','Citibank India','Crédit Agricole Corporate and Investment Bank','Credit Suisse','CTBC Bank','DBS Bank','Deutsche Bank','Emirates NBD','First Abu Dhabi Bank','FirstRand Bank','HSBC Bank India','Industrial & Commercial Bank of China','Industrial Bank of Korea','JPMorgan Chase','KEB Hana Bank','Kookmin Bank','Krung Thai Bank','Mizuho Corporate Bank','MUFG Bank','Qatar National Bank','Rabobank','Sberbank','Shinhan Bank','State Bank of Mauritius','Societe Generale','Sonali Bank','Standard Chartered Bank','Sumitomo Mitsui Banking Corporation','United Overseas Bank','Westpac Banking Corporation','Woori Bank','Access Bank','Banco Bilbao Vizcaya Argentaria','Banco BPM','Banco de Sabadell','Bank of Montreal','Bank of Taiwan','Busan Bank','Caixa Geral de Depositos','Credit Industriel et Commercial','DNB Bank','DZ Bank','Gazprombank','Intesa Sanpaolo','National Australia Bank','Natixis','Raiffeisen Bank International','Skandinaviska Enskilda Banken','The Bank of New York Mellon','Toronto Dominion Bank','UBS AG','Wells Fargo Bank','Zurcher Kantonalbank','Airtel Payments Bank','India Post Payments Bank','Paytm Payments Bank','Jio Payments Bank','Fino Payments Bank','NSDL Payments Bank','Kerala State Co-operative Bank Limited','The Maharashtra State Co-operative Bank Limited','Mizoram Co-operative Apex Bank','Tamil Nadu State Apex Co-operative Bank','West Bengal State Co-operative Bank','The Delhi State Co-operative Bank Ltd','Abhyudaya Co-operative Bank Ltd','Ahmedabad Mercantile Co-Op Bank Limited','Amanath Co-operative Bank Limited','Andhra Pradesh Mahesh Co-Op Urban Bank Limited','Apna Sahakari Bank Limited','Bassein Catholic Co-operative Bank Limited','Bharat Co-operative Bank (Mumbai) Limited','Bombay Mercantile Co-operative Bank Limited','Citizen Credit Co-operative Bank Limited','Cosmos Bank','Dombivli Nagari Sahakari Bank Ltd','Fingrowth Co-operative Bank Limited','Goa Urban Co-operative Bank Limited','Gopinath Patil Parsik Janata Sahakari Bank Limited','Greater Bombay Co-operative Bank Limited','GS Mahanagar Co-operative Bank Limited','Indian Mercantile Co-operative Bank Limited','Jalgaon Janata Sahakari Bank Limited','Jalgaon People's Co-operative Bank Limited','Janakalyan Sahakari Bank Limited','Janalaxmi Co-operative Bank Limited','Janata Sahakari Bank Limited','Kallappanna Awade Ichalkaranji Janata Sahakari Bank Limited','Kalupur Commercial Co-Op Bank Limited','Kalyan Janata Sahakari Bank Limited','Karad Urban Co-operative Bank Limited','Mapusa Urban Co-operative Bank of Goa Limited','Nagar Urban Co-operative Bank Limited','Nagpur Nagrik Sahakari Bank Limited','Nasik Merchant's Co-operative Bank Limited','New India Co-operative Bank Limited','NKGSB Co-operative Bank Limited','Nutan Nagarik Sahakari Bank Limited','Osmanabad Janata Sahakari Bank Limited','Pravara Sahakari Bank Limited','Punjab and Maharashtra Co-operative Bank','Rajarambapu Sahakari Bank Limited','Rajkot Nagrik Sahakari Bank Limited','Rupee Co-operative Bank Limited','Sangli Urban Co-operative Bank Limited','Saraswat Bank','Sardar Bhiladwala Pardi People's Co-op. Bank Limited','Shamrao Vithal Co-operative Bank','Shikshak Sahakari Bank Limited','Solapur Janata Sahakari Bank Limited','Surat Peoples Coop Bank Limited','Thane Bharat Sahakari Bank Limited','The Akola Janata Commercial Co-operative Bank Limited','The Akola Urban Co-operative Bank Limited','The Jaynagar Majilpur People's Co-Operative Bank Limited','The Khamgaon Urban Co-operative Bank Limited','The Mehsana Urban Co-Op Bank Limited','TJSB Sahakari Bank','Vasai Vikas Sahakari Bank Limited','Zoroastrian Co-operative Bank Limited'
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
    // this.paymentInitiated = this.payFormService.paymentInitiated;
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

    var x: any = amountInNumber;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var resAmountInNumber = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    
    return `${resAmountInNumber} (Rs${amountInWords} only)`;
  }
  // transaction ID
  getTransId() {
    let todayDate = this.getTodayDate().split("-");
    let todayTime = this.getTodayTime().split(":");
    return `${todayDate[2]}${todayDate[1]}${todayDate[0]}${todayTime[2]}${todayTime[1]}${todayTime[0]}`
  }
  // modal
  openDialog(): void {
    const dialogRef = this.dialog.open(PaymentConfirmModalComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
