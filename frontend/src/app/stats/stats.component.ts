import { Component } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { game } from '../game';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  constructor(public sharedService:SharedserviceService) {}
  openDetails(game:game) {
    console.log(game.id);

  }
}
