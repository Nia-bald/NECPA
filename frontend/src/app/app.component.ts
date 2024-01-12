import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalculationComponent } from './calculation/calculation.component';
import { GameoverscreenComponent } from './gameoverscreen/gameoverscreen.component';
import { RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { SharedserviceService } from './sharedservice.service';
import { ActivatedRoute } from '@angular/router';
import { TimerComponent } from './timer/timer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, StatsComponent, TimerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public sharedService:SharedserviceService, private route:ActivatedRoute) {}
  title = 'calcprac';
  
}
