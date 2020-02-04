import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-intro',
    templateUrl: 'intro.component.html',
    styleUrls: ['intro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class IntroComponent {
    constructor() { }
}
