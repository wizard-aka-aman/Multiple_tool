import { AsyncPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@microsoft/signalr';


@Component({
  selector: 'app-alarm',
  imports: [DatePipe , FormsModule],
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.css'
})
export class AlarmComponent {

    data :  any = { 
    "description" :   'a',  
    "completed" : '', 
  };

  emailItemDto :any ;
  date :Date = new Date(); 
  constructor( private toastr : ToastrService , private http : HttpClient) {   
    
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7259/alarmHub")
    .build();
    
    connection.on("AlarmTriggered", function (message) {
         const audio = new Audio('assets/sounds/sound.mp3');
  audio.play().catch(err => console.error("Audio error:", err));


      console.log(message);
      
      document.getElementById("alarmModal")!.style.display = "block";
    });
    connection.start().catch(err => console.error(err.toString()));

  } 
  soundEnabled = false;

enableSound() {
  const audio = new Audio('assets/sounds/sound.mp3');
  audio.play().then(() => {
    this.soundEnabled = true;
    console.log('Sound unlocked and ready');
  }).catch(err => {
    console.error('User gesture not registered yet:', err);
  });
}



  getSubmit(){
    this.emailItemDto = { 
      Body: this.data.description, 
      Completed : this.data.completed, 
    };
     
    this.http.post("https://localhost:7259/api/Job/CreateScheduleJob",this.emailItemDto).subscribe({
      next:(res:any)=>{
        this.toastr.success("Alarm Created successfully " , "success");
        console.log(res);
        // console.log("alarm created")
      },
      error:(err:any)=>{
        this.toastr.error(err.error , "error")
        console.log(err);
      }
    })
  }
clear(){
  this.data.description = '';
  this.data.completed = '';
}


}
