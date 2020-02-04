import { NgModule } from '@angular/core';
import { GameRoutingModule } from './game.routing';
import { CommonModule } from '@angular/common';

// I have separated Material imports on purpose for performance benefits
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { GameContainerComponent } from './containers/game/game.container';
import { GameLayoutComponent } from './components/game-layout/game-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { StarfightersService } from './services/starfighters/starfighters.service';
import { DeckComponent } from './components/deck/deck.component';
import { ActiveMatchupComponent } from './components/active-matchup/active-matchup.component';
import { StarfighterCardComponent } from './components/starfighter-card/starfighter-card.component';
import { WinnerWheelComponent } from './components/winner-wheel/winner-wheel.component';
import { SummaryDialogComponent } from './components/summary-dialog/summary-dialog.component';


@NgModule({
    imports: [
        CommonModule,
        GameRoutingModule,
        HttpClientModule,

        // Material Modules
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule
    ],
    declarations: [
        GameContainerComponent,
        GameLayoutComponent,
        DeckComponent,
        ActiveMatchupComponent,
        StarfighterCardComponent,
        WinnerWheelComponent,
        SummaryDialogComponent
    ],
    entryComponents: [
        SummaryDialogComponent
    ],
    providers: [StarfightersService]
})
export class GameModule { }
