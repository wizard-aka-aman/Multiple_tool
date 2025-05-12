import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-text',
  imports: [FormsModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {
  text: string = '';  
  lengthoftext: number = 0; 
  constructor(private toastr: ToastrService) {
    this.lengthoftext = this.text.split(' ').length
  }

  copy() {
    this.toastr.success("Text Copied", "Success");
    navigator.clipboard.writeText(this.text);

  }
  uppercase() {
    this.text = this.text.toUpperCase();

  }
  lowercase() {
    this.text = this.text.toLowerCase();
  }
  titlecase() {
    this.text = this.text.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  }
  formate() {
    this.text = this.text.trim().split(/\s+/).toString().replaceAll(",", " "); 
  }
  sentancecase() {
    this.text = this.text.trim().split(".").map(e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(".");
  }
  clear() {
    this.text = "";
  }
  get wordCount(): number {
    if (!this.text.trim()) {
      return 0;
    }
    return this.text.trim().split(/\s+/).length;
  }
  get charCount(): number {
    if (!this.text.trim()) {
      return 0;
    }
    return this.text.length;
  }

  get sentance() :number{
    if (!this.text.trim()) {
      return 0;
    }
    return this.text.trim().split(".").length -1 ;
  }
  get minuteRead() :number{
    if (this.text.length ==0 ) {
      return 0;
    }
    var  res = this.text.trim().split(/\s+/).length; 
    return res *0.008;
  }

}
