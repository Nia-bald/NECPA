import { Component } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})

export class TimerComponent {
  intervalId: any;
  intervalActive: boolean = false;
  private subscription: Subscription;
  constructor(public sharedService: SharedserviceService, private router: Router) {
    this.subscription = this.sharedService.isTimerOn$.subscribe((value)=>{this.handleisTimerOnchange(value);})
  }

  handleisTimerOnchange(value: boolean): void {
    console.log(value);
    if (value==true) {
      this.startTimer();
    }
  }

  ngOnInit(): void {
  }


  startTimer() {
    if (this.intervalActive == false){
      this.intervalId = setInterval(() => this.numIncrement(this.sharedService.time), 1000);
      
      this.intervalActive = true;
    }
  }

  stopTimer(){
    clearInterval(this.intervalId);
    this.intervalActive = false;
  }

  numIncrement(numRecievd: number){
    
    this.sharedService.time -= 1;
    if (this.sharedService.time == 0) {
      this.sharedService.computeHighScore();
      this.stopTimer();
      this.sharedService.setisTimerOn(false);
      this.router.navigate(['/gameover'])
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
