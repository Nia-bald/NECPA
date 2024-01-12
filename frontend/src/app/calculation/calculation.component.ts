import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedserviceService } from '../sharedservice.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TimerComponent } from '../timer/timer.component';
import { TimeTracker } from '../functions';
import { StatsComponent } from '../stats/stats.component';
import { NgIf, NgStyle } from '@angular/common';
@Component({
  selector: 'app-calculation',
  standalone: true,
  imports: [FormsModule, TimerComponent, StatsComponent, NgIf, NgStyle],
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.css'
})

export class CalculationComponent {
  timeTracker = new TimeTracker();
  num1:number=-1;
  num2:number=-1;
  userans:string="";
  correctans:number=1;
  operation:string="";
  operations: string[] = ["+", "-", "÷", "×"];
  ix:number=-1;
  temp:number=0;
  localcopy: boolean = false;
  diffculty: string = 'easy';
  easyselected: boolean = false;
  mediumselected: boolean = true;
  hardselected: boolean = false;
  private subscription: Subscription;
  constructor(public sharedService: SharedserviceService, public route:ActivatedRoute) {
    this.subscription = this.sharedService.isTimerOn$.subscribe((value)=>{this.handleisTimerOnchange(value);})

  }

  handleisTimerOnchange(value: boolean): void {
    if (value == false) {
      this.assignProblem();
    }
  }

  
  
  getRandomInt(max:number, min:number): number {
    return Math.floor(Math.random()*(max-min+1)) + min;
  }

  operate(num1:number, num2:number, operation:string): number{
    if (operation == "+"){
      return num1 + num2
    }
    if (operation == "-"){
      return num1 - num2
    }
    if (operation == "÷"){
      return num1/num2
    }
    if (operation == "×"){
      return num1*num2
    }
    return -1
  }

  assignProblem(){
    // console.log(this.route.snapshot.routeConfig?.path);
    this.timeTracker.startTimer();

    this.ix = this.getRandomInt(this.operations.length-1, 0);
    this.operation = this.operations[this.ix];

    if (this.diffculty == 'easy'){
      this.num1 = this.getRandomInt(10, 1);
      this.num2 = this.getRandomInt(10, 1);  
    }
    if (this.diffculty == 'medium'){
      if (this.operation != '÷' && this.operation != '×'){
        this.num2 = this.getRandomInt(100, 10);  
        this.num1 = this.getRandomInt(100, 10);
      }
      else{
        this.num2 = this.getRandomInt(12, 1);
        this.num1 = this.getRandomInt(90, 10);
      }
    }
    if (this.diffculty == 'hard'){
      this.num2 = this.getRandomInt(100, 10);  
      this.num1 = this.getRandomInt(100, 10);
    }

    if (this.num1 < this.num2){
      this.temp = this.num1
      this.num1 = this.num2
      this.num2 = this.temp
    }

    if (this.operation == "÷"){
      this.num1 = this.num1*this.num2
    }

    this.correctans = this.operate(this.num1, this.num2, this.operation)
  }

  ngOnInit(): void{
    this.assignProblem()
  }

  checkAns(){
    this.sharedService.isTimerOn$.subscribe((value)=>{
      this.localcopy = value;
    })
    if (this.localcopy == false) {
      this.sharedService.setisTimerOn(true);
    }
    if (parseInt(this.userans, 10) == this.correctans){
      this.sharedService.game.correct += 1
    }
    else {
      this.sharedService.game.incorrect += 1
    }  
    this.sharedService.game.accuracy = this.sharedService.game.correct/(this.sharedService.game.correct + this.sharedService.game.incorrect)
    this.sharedService.game.accuracy = Math.round(this.sharedService.game.accuracy*1000)/1000
    this.sharedService.game.rate = this.sharedService.game.correct/this.sharedService.game.time
    this.sharedService.game.date = new Date().toISOString();
    const secondsPassed = this.timeTracker.endTimer();
    this.sharedService.problem.num1 = this.num1;
    this.sharedService.problem.operation = this.operation;
    this.sharedService.problem.num2 = this.num2;
    this.sharedService.problem.timetaken = secondsPassed;
    this.sharedService.problem.correct = parseInt(this.userans, 10) == this.correctans;

    this.sharedService.game.problemdetails.push(Object.assign({}, this.sharedService.problem))
    this.assignProblem();
    this.userans="";
  }


  setdifficulty2easy() {
    this.diffculty = 'easy';
    this.easyselected = true;
    this.mediumselected = false;
    this.hardselected = false;
    this.assignProblem();

  }

  setdifficulty2medium() {
    this.diffculty = 'medium';
    this.easyselected = false;
    this.mediumselected = true;
    this.hardselected = false;
    this.assignProblem();
  }

  setdifficulty2hard() {
    this.diffculty = 'hard';
    this.easyselected = false;
    this.mediumselected = false;
    this.hardselected = true;
    this.assignProblem();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
