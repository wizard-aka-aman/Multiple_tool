import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as signalR from '@microsoft/signalr';
import { interval, map, Observable } from 'rxjs';


@Component({
  selector: 'app-alarm',
  imports: [DatePipe, FormsModule, AsyncPipe, CommonModule],
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.css'
})
export class AlarmComponent {
  
  data: any = {
    "completed": '',
  };
  allAlarm: any;
  emailItemDto: any;
  date: Date = new Date();
  currentTime: Observable<Date> = new Observable<Date>;
  lapnumber: number = 1;
   audio :any= new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3");
  
  constructor(private toastr: ToastrService, private http: HttpClient) {
    this.http.get("https://localhost:7259/api/Alarm/GetAlarm").subscribe((res: any) => {
      console.log(res);
      this.allAlarm = res;
    })
    
    this.currentTime = interval(1000).pipe(map(() => new Date()));
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7259/alarmHub")
    .build();
    connection.on("AlarmTriggered",  (message) => {
      console.log(message);
      this.audio.play();
      document.getElementById("alarmModal")!.style.display = "block";
    });
    connection.start().catch(err => console.error(err.toString()));
  }


  soundEnabled = false;
  getAllAlarm() {
    this.http.get("https://localhost:7259/api/Alarm/GetAlarm").subscribe((res: any) => {
      console.log(res);
      this.audio.pause();
      this.allAlarm = res;
    })
  }

  enableSound() {
    this.audio.play().then(() => {
      this.soundEnabled = true;
      console.log('song played');
    }).catch((err:any) => {
      console.error('Audio play failed:', err);
    });
  }
  disabledSound() {
    this.audio.pause  ();
  }

  getSubmit() {
    this.emailItemDto = {
      Completed: this.data.completed,
      name: "Alarm " + this.lapnumber
    };
    console.log(this.emailItemDto);
    this.http.post("https://localhost:7259/api/Job/CreateScheduleJob", this.emailItemDto).subscribe({
      next: (res: any) => {
        this.lapnumber++;
        this.getAllAlarm();
        this.toastr.success("Alarm Created successfully ", "success");
        console.log(res);
      },
      error: (err: any) => {
        this.toastr.error("please Enter a Valid Time & Date", "error")
        console.log(err);
      }
    })
  }

  clear() {
    this.data.completed = '';
  }

  deletejob(jobid: number) {
    const isdelete = confirm("Sure you want to Delete this Alarm?");
    if (isdelete) {
      this.http.delete("https://localhost:7259/api/Job/DeleteAlarm/" + jobid).subscribe((res: any) => {
        this.getAllAlarm();
        this.toastr.success("Alarm Deleted successfully ", "success");
        console.log(res);
      })
    }
  }


}
