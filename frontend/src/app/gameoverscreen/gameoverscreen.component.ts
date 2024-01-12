import { Component } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-gameoverscreen',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gameoverscreen.component.html',
  styleUrl: './gameoverscreen.component.css'
})
export class GameoverscreenComponent {
  time: number=10;
  constructor(public sharedService: SharedserviceService, private router:Router) {}

  restart() {
    if (this.time != 0){
      this.sharedService.maxtime = this.time;}
    this.sharedService.time = this.sharedService.maxtime;
    this.sharedService.game.attempted = this.sharedService.game.correct + this.sharedService.game.incorrect;
    this.sharedService.game.problemdetails.shift();
    this.sharedService.games.push(Object.assign({}, this.sharedService.game));
    this.sharedService.game.correct = 0;
    this.sharedService.game.incorrect = 0;
    this.sharedService.game.accuracy = 0;
    this.sharedService.game.attempted=0;
    this.sharedService.game.id += 1;
    this.sharedService.game.time = this.sharedService.maxtime
    this.sharedService.game.rate = this.sharedService.game.correct/this.sharedService.game.time
    this.sharedService.game.date = new Date().toISOString();
    this.sharedService.game.problemdetails = [];
    this.sharedService.saveGame();
    this.router.navigate(['/']);
  }
}
