export class PayModel {
  // public benefName: string;
  // public senderMobNo: number;
  // public senderName: string;
  // public accountNumber: number;
  // public payType: string;
  // public ifscCode: string;
  // public bankName: string;
  // public payAmount: string;

  constructor(
    public benefName: string,
    public senderMobNo: number,
    public senderName: string,
    public accountNumber: number,
    public payType: string,
    public ifscCode: string,
    public bankName: string,
    public payAmount: string,
    public payAmountInWords: string,
    public todayDate: string,
    public todayTime: string,
    public transactionId: string,
    public status: string,
    public delId?: string,
  ) {
    // this.benefName = benefName;
    // this.senderMobNo = senderMobNo;
    // this.senderName = senderName;
    // this.accountNumber = accountNumber;
    // this.payType = payType;
    // this.ifscCode = ifscCode;
    // this.bankName = bankName;
    // this.payAmount = payAmount;
  }
}