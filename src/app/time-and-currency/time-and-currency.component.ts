import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-and-currency',
  imports: [CommonModule , FormsModule , CurrencyPipe],
  templateUrl: './time-and-currency.component.html',
  styleUrl: './time-and-currency.component.css'
})
export class TimeAndCurrencyComponent {
  data:any ;
  input :any;
  dateTimeLocal : any = "";
  currencyList:any;
  FromselectedCurrencyCode :string = "";
  ToselectedCurrencyCode :string = "";
  FromselectedTime :any = "";
  ToselectedTime :any = ""; 
  countries :any
  convertedAnswer : any;  
    date = new Date();
    timeAnswer :any;  
    postdata :any= {};
    constructor(private http: HttpClient) {
    // this.http.get("https://api.currencyapi.com/v3/currencies?apikey=cur_live_pimw5v6L4rXNT7r06CSRXdBFLNN2uBCHBlBu5fYA").subscribe((res: any) => {
    //   this.data = res.data;   
    //     //Object.values is used to convert into array 
    //     this.currencyList = Object.values(this.data);   
        
        
    //   })
      
       this.http.get("https://api.opentimezone.com/timezones").subscribe((res: any) => { 
      this.countries =res  
      // console.log(res);
      })
       
  }

  Currencyconvert(){ 
    //   this.http.get("https://api.currencyapi.com/v3/latest?apikey=cur_live_pimw5v6L4rXNT7r06CSRXdBFLNN2uBCHBlBu5fYA").subscribe((res: any) => {
    //     console.log(res);
        
    //   this.convertedAnswer = this.input / res.data[this.FromselectedCurrencyCode].value;  
    //   this.convertedAnswer =  this.convertedAnswer * res.data[this.ToselectedCurrencyCode].value; 
    //   // used to display the symbol of the currency
    //   // this.convertedAnswer = this.data[this.ToselectedCurrencyCode].symbol+" " +this.convertedAnswer;   
    // })  
    
  }
  Timeconvert(){  
    this.postdata.dateTime =this.dateTimeLocal;
    this.postdata.fromTimezone=this.FromselectedTime;
    this.postdata.toTimezone =this.ToselectedTime;
    console.log(this.postdata);
    
      this.http.post("https://api.opentimezone.com/convert",this.postdata).subscribe((res: any) => { 
    
      console.log(res);
      this.timeAnswer = res.dateTime;
      })

}
swap(){
  const temp = this.FromselectedTime;
  this.FromselectedTime = this.ToselectedTime;
  this.ToselectedTime = temp;
  this.angle += 180;
}
angle = 0;
 

}
