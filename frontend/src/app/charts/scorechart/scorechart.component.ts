import { Component } from '@angular/core';
import { SharedserviceService } from '../../sharedservice.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-scorechart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './scorechart.component.html',
  styleUrl: './scorechart.component.css'
})
export class ScorechartComponent {
  view: [number, number] = [100, 300];
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Game number';
  yAxisLabel: string = 'Score';
  timeline: boolean = true;
  colorScheme = '#5AA454';

  data = [
    {
      "name": "games",
      "series": [] as { name: number; value:number}[]
    }
  ];
  
  constructor(public sharedService: SharedserviceService) {
    const games = this.sharedService.games.map((game)=>({ ...game}))

    for (const game of games) {
      this.data[0]['series'].push({ "name": game.id, "value": game.correct });
    }
    console.log(this.data) 

  }
  
  // onSelect(data: any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }
  // onActivate(data: any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data: any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

  
}
