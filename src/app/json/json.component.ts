import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-json',
  imports: [FormsModule ,NgxJsonViewerModule],
  templateUrl: './json.component.html',
  styleUrl: './json.component.css'
})
export class JsonComponent {
  text :any =""; 
  viwer:any[] =[] ; 
  constructor(private toastr: ToastrService) {
    
    
  }
  onSend(){
    console.log(this.text);
    this.viwer = this.text
    this.viwer = JSON.parse(this.text)
    console.log(this.viwer);
    
  }
  copy(){
    this.toastr.success("Copied" , "Success")
    navigator.clipboard.writeText(this.text)
     
  }
}
