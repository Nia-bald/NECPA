import { Routes } from "@angular/router";
import { GameoverscreenComponent } from "./gameoverscreen/gameoverscreen.component";
import { CalculationComponent } from "./calculation/calculation.component";
import { GamedetailsComponent } from "./gamedetails/gamedetails.component";

const routeConfig: Routes = [
    {
        path: '',
        component: CalculationComponent,
        title: 'calculate'
    },
    {
        path: 'gameover',
        component: GameoverscreenComponent,
        title: 'gameover'
    },
    {
        path: 'gamedetails/:id',
        component: GamedetailsComponent,
        title: 'gamedetails'
    }
]

export default routeConfig;