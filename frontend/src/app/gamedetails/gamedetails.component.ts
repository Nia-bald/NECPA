import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedserviceService } from '../sharedservice.service';
import { game } from '../game';
import { problemdetail } from '../game';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-gamedetails',
  standalone: true,
  imports: [NgFor],
  templateUrl: './gamedetails.component.html',
  styleUrl: './gamedetails.component.css'
})
export class GamedetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  sharedService = inject(SharedserviceService);
  localgame: game | undefined;
  constructor() {
    const gameId = Number(this.route.snapshot.params['id']);
    console.log(gameId);
    this.localgame = this.sharedService.games.find(g => g.id === gameId);
  }

}
