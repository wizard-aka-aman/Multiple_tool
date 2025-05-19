import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generate } from "random-words";


@Component({
  selector: 'app-typing',
  imports: [FormsModule, CommonModule],
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.css'
})
export class TypingComponent implements AfterViewInit {
  intervalId: any;
  isStarted: boolean = false;
  seconds: number = 0;
  inputText: string = "";
  givenText: any = [];
  useraccuracy: number = 0;
  userwpm: number = 0;
  TotalWordsAttemped: number = 0;
  CorrectedWordAttemped: number = 0;
  startIntervalbeforeTyping: any;
  width: number = 0;
  @ViewChild('textArea') textAreaRef!: ElementRef;
  @ViewChild('textDisplay') textDisplay!: ElementRef;

  constructor() {
    this.startTyping();

  }
  ngAfterViewInit() {
    const element = document.getElementById('textareaId');
    element?.addEventListener('paste', e => e.preventDefault());
    this.width = this.textDisplay.nativeElement.offsetWidth;
    // console.log('Div width:', this.width + 'px');
    // console.log('Div width:', this.width / 118 + 'px');
  }
  reset() {
    this.startTyping();
    this.inputText = "";
    this.seconds = 0;
    this.useraccuracy = 0;
    this.userwpm = 0;
    this.TotalWordsAttemped = 0;
    this.CorrectedWordAttemped = 0;
    this.textAreaRef.nativeElement.focus();

  }
  startTyping() {
    this.givenText = generate(216);
    const wordArray = Array.isArray(this.givenText) ? this.givenText : this.givenText.split(/\s+/);
    this.givenText = wordArray.map((word: any) => ({
      word: word,
      isCorrect: false
    }));


    // console.log(this.givenText);


    if (this.startIntervalbeforeTyping == undefined) {
      this.startIntervalbeforeTyping = setInterval(() => {
        if (this.inputText != "") {
          this.start();
          clearInterval(this.startIntervalbeforeTyping);
        }
      }, 1)
    }
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
        this.startIntervalbeforeTyping = undefined

        // this.startTyping();
      }
    }, 1000);
  }
  autoScrollDisplayPerWord() {
    const el = this.textDisplay.nativeElement;
    el.scrollTop += 6;
  }



  accuracy(): any {
    // console.log("accuracy function");
    this.inputText = this.inputText.trim();
    const typedWords = this.inputText.split(' ');
    let correctedWords = 0;
    let totalWordsAttempted = typedWords.length;
    // console.log(typedWords);
    // console.log(Math.ceil(this.width / 100));
    // console.log(totalWordsAttempted % Math.ceil(this.width / 100) == 0);

    if (totalWordsAttempted % Math.ceil(this.width / 100) == 0) {
      this.autoScrollDisplayPerWord();
    }
    for (let index = 0; index < typedWords.length; index++) {
      if (typedWords[index] == this.givenText[index].word) {
        correctedWords++;
        this.givenText[index].isCorrect = true
      } else {
        this.givenText[index].isCorrect = false
      }
    }
    // console.log("correctedWords" + correctedWords);
    // console.log("totalWordsAttempted" + totalWordsAttempted);
    this.useraccuracy = (correctedWords / totalWordsAttempted) * 100;
    // console.log(this.useraccuracy);
    this.TotalWordsAttemped = totalWordsAttempted
    this.CorrectedWordAttemped = correctedWords;

    return this.useraccuracy;

  }
  wpm(): any {
    this.inputText = this.inputText.trim();
    const typedWords = this.inputText.split(' ');
    let correctedWords = 0;
    for (let index = 0; index < typedWords.length; index++) {
      if (typedWords[index] == this.givenText[index].word) {
        correctedWords++;
      }
    }
    // console.log(correctedWords);
    // console.log(this.seconds + "this.seconds");

    this.userwpm = correctedWords
    return this.userwpm.toFixed(2)
  }

}
