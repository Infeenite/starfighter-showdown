import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameContainerComponent } from './containers/game/game.container';


const routes: Routes = [
  {
    path: '',
    component: GameContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
