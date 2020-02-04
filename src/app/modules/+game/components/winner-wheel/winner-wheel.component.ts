import { Component, Input } from '@angular/core';
import { playerOneWinsAnimation, playerTwoWinsAnimation, drawAnimation, verdictAnimation, winnerAnimation } from './winner-wheel.animations';
import { Player } from '../../models/player-enum';

@Component({
    selector: 'app-winner-wheel',
    templateUrl: 'winner-wheel.component.html',
    styleUrls: ['winner-wheel.component.scss'],
    animations: [playerOneWinsAnimation,
                 playerTwoWinsAnimation,
                 winnerAnimation,
                 drawAnimation,
                 verdictAnimation]
})

export class WinnerWheelComponent {
    @Input() winner: Player;
    PlayerEnum = Player;
}
