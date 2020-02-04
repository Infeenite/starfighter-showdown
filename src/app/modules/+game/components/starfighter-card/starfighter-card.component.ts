import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Starfighter } from '../../models/starfighter';

@Component({
    selector: 'app-starfighter-card',
    templateUrl: 'starfighter-card.component.html',
    styleUrls: ['starfighter-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StarfighterCardComponent {
    @Input() content: Starfighter;
    @Input() labelIfEmpty: string;
}
