import { PayModel } from "../model/payform.model";
// import { DataStorageService } from "./data-storage.service";

export class PayFormService {
  payFormData: PayModel;
  paymentInitiated: boolean = false;
  paymentDone: boolean = false;

  constructor(
    // private dataStorageService: DataStorageService
  ) {}
  
  addPayData(payData: PayModel) {
    this.payFormData = payData;
    // this.dataStorageService.storePayData(payData);
  }
  getPayFormData() {
    return this.payFormData;
  }
  
}
