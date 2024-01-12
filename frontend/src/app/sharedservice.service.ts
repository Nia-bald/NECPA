import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { game, problemdetail } from './game';
import * as Collections from 'typescript-collections';



@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  // games = new Collections.Queue();
  url = 'http://localhost:3000/games';
  games: game[]= [];

  private isTimerOnSource = new BehaviorSubject<boolean>(false);
  isTimerOn$ = this.isTimerOnSource.asObservable();
  maxtime: number = 10;
  highscore: number = 0;
  // currentDateAndTime: Date = new Date();

  game: game = {
    id : 1,
    correct: 0,
    incorrect: 0,
    accuracy: 0,
    attempted: 0,
    time: this.maxtime,
    rate: 0,
    problemdetails: [],
    date: new Date().toISOString()
  }
  problem: problemdetail = {
    num1 : 0,
    operation: '',
    num2: 0,
    timetaken: 0,
    correct: false,
  }
  data :string = "";
  time: number = this.maxtime;
  constructor() {
    this.loadGame();
  }

  loadGame() {
    const storedGames = localStorage.getItem('games');
    if (storedGames !== null) {
        this.games = JSON.parse(storedGames);
        this.game.id = this.games[this.games.length-1].id+1;
    }
  }
  
  saveGame() {
    localStorage.setItem('games', JSON.stringify(this.games));
  }
  setisTimerOn(value: boolean): void {
    this.isTimerOnSource.next(value);
  }
  computeHighScore() {
    // if (this.games.length == 0) return 0;
    console.log(Math.max(...this.games.map(obj=>obj.correct), this.game.correct, 0));
    return Math.max(...this.games.map(obj=>obj.correct), this.game.correct, 0);
  }
}
