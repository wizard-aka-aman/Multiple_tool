import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  iddisplay: string = "";
  constructor() {

      console.log(this.iddisplay);
      
    document.addEventListener("keydown", ({ keyCode, key }) => {

      // console.log(key);
      if (key == "1") {
        console.log(this.iddisplay)
        this.iddisplay += "1"
      }
      if (key == "2") {
        console.log(this.iddisplay)
        this.iddisplay += "2"
      }
      if (key == "3") {
        console.log(this.iddisplay)
        this.iddisplay += "3"
      }
      if (key == "4") {
        console.log(this.iddisplay)
        this.iddisplay += "4"
      }
      if (key == "5") {
        console.log(this.iddisplay)
        this.iddisplay += "5"
      }
      if (key == "6") {
        console.log(this.iddisplay)
        this.iddisplay += "6"
      }
      if (key == "7") {
        console.log(this.iddisplay)
        this.iddisplay += "7"
      }
      if (key == "8") {
        console.log(this.iddisplay)
        this.iddisplay += "8"
      }
      if (key == "9") {
        console.log(this.iddisplay)
        this.iddisplay += "9"
      }
      if (key == "-") {
        console.log(this.iddisplay)
        this.iddisplay += "-"
      }
      if (key == "+") {
        console.log(this.iddisplay)
        this.iddisplay += "+"
      }
      if (key == "*") {
        console.log(this.iddisplay)
        this.iddisplay += "*"
      }
      if (key == "/") {
        console.log(this.iddisplay)
        this.iddisplay += "/"
      } 
      if (key == "Enter") {
        console.log(this.iddisplay)
        this.iddisplay = eval(this.iddisplay) 
      } 
      if (key == "0") {
        console.log(this.iddisplay)
        this.iddisplay += "0"
      } 
      if (key == ".") {
        console.log(this.iddisplay)
        this.iddisplay += "."
      } 
      if (key == "Backspace") {
        console.log(this.iddisplay)
        this.iddisplay = this.iddisplay.toString().slice(0 ,-1);
      }   

    });
  }

  clicked( value:string){ 
    if(value == "DE"){
      this.iddisplay = this.iddisplay.toString().slice(0 ,-1);
      return;
    } 
    if(value == "="){
      this.iddisplay = eval(this.iddisplay);
      return;
    } 
    if(value == "AC"){
      this.iddisplay = "";
      return;
    }

    this.iddisplay += value
  }

}
