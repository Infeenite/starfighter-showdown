import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Starfighter } from '../../models/starfighter';

@Component({
    selector: 'app-deck',
    templateUrl: 'deck.component.html',
    styleUrls: ['deck.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DeckComponent {
    @Input() label: string;
    @Input() starfighters: Starfighter[];
    @Input() error: boolean;

    @Output() selectCard: EventEmitter<Starfighter> = new EventEmitter<Starfighter>();
}

