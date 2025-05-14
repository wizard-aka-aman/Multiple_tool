import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generate, count } from "random-words";

@Component({
  selector: 'app-typing',
  imports: [FormsModule],
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.css'
})
export class TypingComponent {
  intervalId: any;
  isStarted: boolean = false;
  seconds: number = 0;
  inputText: string = "";
  givenText : string = "";
  useraccuracy : number = 0;
  userwpm : number = 0;
  TotalWordsAttemped :number =0 ;
  CorrectedWordAttemped : number =0;
  constructor() { 
    this.startTyping();
    
  }
  async startTyping() { 
    this.givenText = await generate(216).toString().replaceAll(',',' ');
  //  console.log(this.givenText);
   
   const ctor = setInterval(()=>{
      if(this.inputText != ""){
      this.isStarted = true;
      this.start();
      clearInterval(ctor);
      

    }
    },1)
}
 
  start() {
    this.intervalId = setInterval(() => {
      this.isStarted = true;
      this.seconds++; 
      
      if (this.seconds > 60) {
        clearInterval(this.intervalId);
        this.isStarted = false;
        this.seconds = 0;
        this.inputText = ""
        // document.getElementById("alarmModal")!.style.display = "block";
          
      this.startTyping();
      }
    }, 100);
  }

  get accuracy() : any{ 
    this.inputText = this.inputText.trim();
    const typedWords = this.inputText.split(' ');
    let correctedWords = 0;
    let totalWordsAttempted = typedWords.length;
    const words = this.givenText.split(' ');  
    // console.log(words);
    console.log(typedWords);
    for (let index = 0; index < typedWords.length; index++) {
      if(typedWords[index] == words[index]){
        correctedWords++;
      }
    }
    console.log("correctedWords" + correctedWords);
    console.log("totalWordsAttempted" + totalWordsAttempted);
    this.useraccuracy = (correctedWords / totalWordsAttempted) * 100; 
    console.log(this.useraccuracy);
    this.TotalWordsAttemped = totalWordsAttempted
    this.CorrectedWordAttemped = correctedWords;
    
    return this.useraccuracy;
    
  }
  get wpm() :any{
    this.inputText = this.inputText.trim();
    const words = this.givenText.split(' ');  
    const typedWords = this.inputText.split(' ');
    let correctedWords = 0;  
    for (let index = 0; index < typedWords.length; index++) {
        if(typedWords[index] == words[index]){
          correctedWords++;
        }
    }
    console.log(correctedWords);
    
    this.userwpm = correctedWords
  return this.userwpm
  }

}
