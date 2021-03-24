import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import { PayModel } from "../model/payform.model";

export type bankNameInterface = string[];

@Injectable({providedIn: 'root'})
export class DataStorageService {
  payFormData: PayModel[];
  bankName = [];
  deletePaymentId: string = null;

  constructor (
    private authService: AuthService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}
  // payment call backs
  storePayData(payData: PayModel) {
    let userToken = this.authService.token;
    return this.http.post(
      'https://nse-app-default-rtdb.firebaseio.com/payment.json?auth=' + userToken,
      payData
    );
  }
  fetchPayData() {
    let userToken = this.authService.token;
    return this.http
    .get<PayModel[]>('https://nse-app-default-rtdb.firebaseio.com/payment.json?auth=' + userToken)
    .pipe(
      map(responseData => {
        this.payFormData = [];
        for (let k in responseData) {
          responseData[k].delId = k;
          this.payFormData.push(responseData[k]);
        }
      })
    );
  }
  deletePayData() {
    let delId = this.deletePaymentId;
    let userToken = this.authService.token;
    return this.http
    .delete(`https://nse-app-default-rtdb.firebaseio.com/payment/${delId}.json?auth=${userToken}`);    
    // .delete('https://nse-app-default-rtdb.firebaseio.com/payment.json?auth=' + userToken)
  }
  // dashboard call backs
  storeBankName(bankNameArr: string[]) {
    let userToken = this.authService.token;
    return this.http.put(
      'https://nse-app-default-rtdb.firebaseio.com/dashboard/bankName.json?auth=' + userToken,
      bankNameArr
    );
  }
  fetchBankName() {
    let userToken = this.authService.token;
    return this.http
    .get<bankNameInterface>('https://nse-app-default-rtdb.firebaseio.com/dashboard/bankName.json?auth=' + userToken)
    .pipe(
      map(responseData => {
        this.bankName = responseData;
      })
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
  // bankName: string[] = ["Bank of Baroda","Bank of India","Bank of Maharashtra","Canara Bank","Central Bank of India","Indian Bank","Indian Overseas Bank","Punjab and Sind Bank","Punjab National Bank","State Bank of India","UCO Bank","Union Bank of India","Axis Bank","Bandhan Bank","CSB Bank","City Union Bank","DCB Bank","Dhanlaxmi Bank","Federal Bank","HDFC Bank","ICICI Bank","IDBI Bank","IDFC First Bank","IndusInd Bank","Jammu & Kashmir Bank","Karnataka Bank","Karur Vysya Bank","Kotak Mahindra Bank","Nainital Bank","RBL Bank","South Indian Bank","Tamilnad Mercantile Bank","Yes Bank","Andhra Pradesh Grameena Vikas Bank","Arunachal Pradesh Rural Bank","Assam Gramin Vikash Bank","Dakshin Bihar Gramin Bank","Chhattisgarh Rajya Gramin Bank","Baroda Gujarat Gramin Bank","Sarva Haryana Gramin Bank","Himachal Pradesh Gramin Bank","Ellaquai Dehati Bank","Jharkhand Rajya Gramin Bank","Karnataka Gramin Bank","Kerala Gramin Bank","Madhya Pradesh Gramin Bank","Maharashtra Gramin Bank","Manipur Rural Bank","Meghalaya Rural Bank","Mizoram Rural Bank","Nagaland Rural Bank","Odisha Gramya Bank","Puduvai Bharathiar Grama Bank","Punjab Gramin Bank","Rajasthan Marudhara Gramin Bank","Tamil Nadu Grama Bank","Telangana Grameena Bank","Tripura Gramin Bank","Aryavart Bank","Uttarakhand Gramin Bank","Bangiya Gramin Vikash Bank","AB Bank","Abu Dhabi Commercial Bank","American Express","Australia and New Zealand Banking Group","Barclays Bank Plc","Bank of America","Bank of Bahrain and Kuwait","Bank of Ceylon","Bank of China","Bank of Nova Scotia","BNP Paribas","Citibank India","Crédit Agricole Corporate and Investment Bank","Credit Suisse","CTBC Bank","DBS Bank","Deutsche Bank","Emirates NBD","First Abu Dhabi Bank","FirstRand Bank","HSBC Bank India","Industrial & Commercial Bank of China","Industrial Bank of Korea","JPMorgan Chase","KEB Hana Bank","Kookmin Bank","Krung Thai Bank","Mizuho Corporate Bank","MUFG Bank","Qatar National Bank","Rabobank","Sberbank","Shinhan Bank","State Bank of Mauritius","Societe Generale","Sonali Bank","Standard Chartered Bank","Sumitomo Mitsui Banking Corporation","United Overseas Bank","Westpac Banking Corporation","Woori Bank","Access Bank","Banco Bilbao Vizcaya Argentaria","Banco BPM","Banco de Sabadell","Bank of Montreal","Bank of Taiwan","Busan Bank","Caixa Geral de Depositos","Credit Industriel et Commercial","DNB Bank","DZ Bank","Gazprombank","Intesa Sanpaolo","National Australia Bank","Natixis","Raiffeisen Bank International","Skandinaviska Enskilda Banken","The Bank of New York Mellon","Toronto Dominion Bank","UBS AG","Wells Fargo Bank","Zurcher Kantonalbank","Airtel Payments Bank","India Post Payments Bank","Paytm Payments Bank","Jio Payments Bank","Fino Payments Bank","NSDL Payments Bank","Kerala State Co-operative Bank Limited","The Maharashtra State Co-operative Bank Limited","Mizoram Co-operative Apex Bank","Tamil Nadu State Apex Co-operative Bank","West Bengal State Co-operative Bank","The Delhi State Co-operative Bank Ltd","Abhyudaya Co-operative Bank Ltd","Ahmedabad Mercantile Co-Op Bank Limited","Amanath Co-operative Bank Limited","Andhra Pradesh Mahesh Co-Op Urban Bank Limited","Apna Sahakari Bank Limited","Bassein Catholic Co-operative Bank Limited","Bharat Co-operative Bank (Mumbai) Limited","Bombay Mercantile Co-operative Bank Limited","Citizen Credit Co-operative Bank Limited","Cosmos Bank","Dombivli Nagari Sahakari Bank Ltd","Fingrowth Co-operative Bank Limited","Goa Urban Co-operative Bank Limited","Gopinath Patil Parsik Janata Sahakari Bank Limited","Greater Bombay Co-operative Bank Limited","GS Mahanagar Co-operative Bank Limited","Indian Mercantile Co-operative Bank Limited","Jalgaon Janata Sahakari Bank Limited","Jalgaon People\'s Co-operative Bank Limited","Janakalyan Sahakari Bank Limited","Janalaxmi Co-operative Bank Limited","Janata Sahakari Bank Limited","Kallappanna Awade Ichalkaranji Janata Sahakari Bank Limited","Kalupur Commercial Co-Op Bank Limited","Kalyan Janata Sahakari Bank Limited","Karad Urban Co-operative Bank Limited","Mapusa Urban Co-operative Bank of Goa Limited","Nagar Urban Co-operative Bank Limited","Nagpur Nagrik Sahakari Bank Limited","Nasik Merchant\'s Co-operative Bank Limited","New India Co-operative Bank Limited","NKGSB Co-operative Bank Limited","Nutan Nagarik Sahakari Bank Limited","Osmanabad Janata Sahakari Bank Limited","Pravara Sahakari Bank Limited","Punjab and Maharashtra Co-operative Bank","Rajarambapu Sahakari Bank Limited","Rajkot Nagrik Sahakari Bank Limited","Rupee Co-operative Bank Limited","Sangli Urban Co-operative Bank Limited","Saraswat Bank","Sardar Bhiladwala Pardi People\'s Co-op. Bank Limited","Shamrao Vithal Co-operative Bank","Shikshak Sahakari Bank Limited","Solapur Janata Sahakari Bank Limited","Surat Peoples Coop Bank Limited","Thane Bharat Sahakari Bank Limited","The Akola Janata Commercial Co-operative Bank Limited","The Akola Urban Co-operative Bank Limited","The Jaynagar Majilpur People\'s Co-Operative Bank Limited","The Khamgaon Urban Co-operative Bank Limited","The Mehsana Urban Co-Op Bank Limited","TJSB Sahakari Bank","Vasai Vikas Sahakari Bank Limited","Zoroastrian Co-operative Bank Limited"];