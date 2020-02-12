import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, EMPTY} from 'rxjs';
import { StarfightersService } from '../../services/starfighters/starfighters.service';
import { Starfighter } from '../../models/starfighter';
import { Matchup } from '../../models/matchup';
import { Player } from '../../models/player-enum';
import { MatSidenav } from '@angular/material/sidenav';
import { SummaryDialogComponent } from '../../components/summary-dialog/summary-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-game-container',
    templateUrl: 'game.container.html'
})

export class GameContainerComponent implements OnInit {
    constructor(private starfightersService: StarfightersService, private dialog: MatDialog) { }

    @ViewChild('sidenav', {static: false}) sidenavRef: MatSidenav;

    playerOneStarfighters$: Observable<Starfighter[]>;
    playerTwoStarfighters$: Observable<Starfighter[]>;
    turn: Player = Player.PlayerOne;
    Turn = Player;
    round: number;
    roundCap = 5;
    matchups: Matchup[] = [];
    playerOnePoints: number[];
    playerTwoPoints: number[];
    error: HttpErrorResponse;

    ngOnInit() {
        this.round = 1;
        this.playerOnePoints = this.playerTwoPoints = [];

        // This is simple thing just to download random page of starfighters from the api between page 1 and 3.
        const playerOneLuck = Math.floor(Math.random() * 3) + 1;
        const playerTwoLuck = Math.floor(Math.random() * 3) + 1;
        this.playerOneStarfighters$ = this.starfightersService
                                        .getStarfighters(playerOneLuck)
                                        .pipe(catchError((error: HttpErrorResponse) => {
                                            this.error = error;
                                            return EMPTY;
                                        }));
        this.playerTwoStarfighters$ = this.starfightersService
                                        .getStarfighters(playerTwoLuck)
                                        .pipe(catchError((error: HttpErrorResponse) => {
                                            this.error = error;
                                            return EMPTY;
                                        }));
    }

    onCardSelected(turn: Player, card: Starfighter): void {
        this.sidenavRef.close().then(() => {
            switch (turn) {
                case Player.PlayerOne:

                    this.turn = Player.PlayerTwo;
                    this.matchups.push({playerOnePick: card});
                    this.sidenavRef.open();

                    break;
                case Player.PlayerTwo:
                    const matchup = this.matchups[this.round - 1];
                    matchup.playerTwoPick = card;
                    matchup.winner = this.pickWinner(matchup);
                    break;
            }
        });

    }

    onNextRound() {
        this.turn = Player.PlayerOne;
        this.recalculatePoints();
        this.round++;
        if (this.round > this.roundCap) {
            this.dialog.open(SummaryDialogComponent, {
                 data: { matchups: this.matchups},
                 width: '800px',
                 height: '600px',
                 disableClose: true
              });
        } else {
            this.sidenavRef.open();
        }

    }


    pickWinner({playerOnePick, playerTwoPick}: Matchup) {
        const powerOne = this.calculatePower(playerOnePick);
        const powerTwo = this.calculatePower(playerTwoPick);
        return !!(powerOne === powerTwo) && Player.Draw
               || (powerOne > powerTwo && Player.PlayerOne || Player.PlayerTwo);
    }

    private recalculatePoints() {
        let playerOnePoints = 0;
        let playerTwoPoints = 0;

        this.matchups.forEach((matchup: Matchup) => {
            if (matchup.winner !== Player.Draw) {
                (matchup.winner === Player.PlayerOne) ? playerOnePoints++ : playerTwoPoints++;
            }
        });

        this.playerOnePoints = Array(playerOnePoints).fill(1);
        this.playerTwoPoints = Array(playerTwoPoints).fill(1);
    }


    private calculatePower({MGLT, crew, length}: Starfighter): number {
        const shipMGLT = this.alwaysAsNumber(MGLT);
        const shipCrew = this.alwaysAsNumber(crew);
        const shipLength = this.alwaysAsNumber(length);
        return Math.floor((shipMGLT * shipCrew) / shipLength);
    }

    private alwaysAsNumber(value: any, valueIfNaN = Math.floor(Math.random() * 100 + 1)) {
        return !isNaN(parseFloat(value)) && parseFloat(value) || valueIfNaN;
    }
}
