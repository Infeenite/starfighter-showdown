import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Matchup } from '../../models/matchup';

@Component({
    selector: 'app-summary-dialog',
    templateUrl: 'summary-dialog.component.html',
    styleUrls: ['summary-dialog.component.scss']
})

export class SummaryDialogComponent {

    constructor(public dialogRef: MatDialogRef<SummaryDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {matchups: Matchup[]}) {}

    displayedColumns = [
        'playerOnePick',
        'playerTwoPick',
        'winner'
    ];
}
