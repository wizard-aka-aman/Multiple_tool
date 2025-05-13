import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  imports: [CommonModule],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.css'
})
export class StopwatchComponent {
  mili: number = 0;
  seconds: number = 0;
  minute: number = 0;
  count :number = 0;
  intervalId :any;
  isStarted : boolean = false;
  lapnumber :number = 0; 
  @ViewChild('tbody') tbody?: ElementRef;
  start() {
    this.intervalId = setInterval(() => {
      this.isStarted = true;
      this.mili++;
      if (this.mili > 99) {
        this.mili = 0;
        if(this.seconds < 59){
          this.seconds++;
        }
        else{
          this.seconds = 0;
          this.minute++;
        }
      } 
      }, 10);
    }
    
    
    stop() {
      this.count++;
      this.isStarted = false;
    clearInterval(this.intervalId);
  }

  lap(){
    console.log(this.minute + " - " + this.seconds + " - " + this.mili);
    const lapbody = document.getElementById('laptbody');
    const laprow = document.createElement('tr');
    const lapcell1 = document.createElement('td');
    const lapcell2 = document.createElement('td'); 
    this.lapnumber++;
    lapcell1.textContent  = "Lap "+this.lapnumber.toString();
    lapcell2.textContent  = this.formattedTime
    
    laprow?.appendChild(lapcell1);
    laprow?.appendChild(lapcell2);
    lapbody?.prepend(laprow)
  }
  
  reset(){
    clearInterval(this.intervalId); // Stop the interval
    this.isStarted = false;
    this.mili = 0;
    this.seconds = 0;
    this.minute = 0;
    this.count =0 ;
    this.lapnumber = 0; 
    const value = this.tbody?.nativeElement;
    while (value.firstChild) {
      value.removeChild(value.firstChild);
    }
  }

  get formattedTime(): string {
    const mm = this.padZero(this.minute);
    const ss = this.padZero(this.seconds);
    const ms = this.padZero(this.mili);
    return `${mm} : ${ss} : ${ms}`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
