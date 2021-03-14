import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  imgCheckedOne: boolean = false;
  imgCheckedTwo: boolean = true;
  imgCheckedThree: boolean = true;
  imgCheckedFour: boolean = true;
  imgCheckedFive: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
    // switch (new Date().getDay()) {
    //   case 0:
    //     day = "Sunday";
    //     break;
    //   case 1:
    //     day = "Monday";
    //     break;
    //   case 2:
    //     day = "Tuesday";
    //     break;
    //   case 3:
    //     day = "Wednesday";
    //     break;
    //   case 4:
    //     day = "Thursday";
    //     break;
    //   case 5:
    //     day = "Friday";
    //     break;
    //   case  6:
    //     day = "Saturday";
    // }
  }

}
