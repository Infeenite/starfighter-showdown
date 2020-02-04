
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Matchup } from '../../models/matchup';

@Component({
    selector: 'app-active-matchup',
    templateUrl: 'active-matchup.component.html',
    styleUrls: ['active-matchup.component.scss']
})

export class ActiveMatchupComponent {
    @Input() matchup: Matchup;
    @Output() nextRound: EventEmitter<any> = new EventEmitter<any>();
}
