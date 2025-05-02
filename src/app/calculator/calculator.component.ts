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

      let keys: string = key;

      switch (keys) {
        case "1": this.iddisplay += "1"
          break;
        case "2": this.iddisplay += "2"
          break;
        case "3": this.iddisplay += "3"
          break;
        case "4": this.iddisplay += "4"
          break;
        case "5": this.iddisplay += "5"
          break;
        case "6": this.iddisplay += "6"
          break;
        case "7": this.iddisplay += "7"
          break;
        case "8": this.iddisplay += "8"
          break;
        case "9": this.iddisplay += "9"
          break;
        case "0": this.iddisplay += "0"
          break;
        case "-": this.iddisplay += "-"
          break;
        case "*": this.iddisplay += "*"
          break;
        case "/": this.iddisplay += "/"
          break;
        case ".": this.iddisplay += "."
          break;
        case "+": this.iddisplay += "+"
          break;
        case "Enter":  this.iddisplay = eval(this.iddisplay);
          break;
        case "Backspace": this.iddisplay = this.iddisplay.toString().slice(0, -1);
          break;

      } 
    });
  }

  clicked(value: string) {
    if (value == "DE") {
      this.iddisplay = this.iddisplay.toString().slice(0, -1);
      return;
    }
    if (value == "=") {
      this.iddisplay = eval(this.iddisplay);
      return;
    }
    if (value == "AC") {
      this.iddisplay = "";
      return;
    }

    this.iddisplay += value
  }

}
