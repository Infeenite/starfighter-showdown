import { GameContainerComponent } from './game.container';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StarfightersService } from '../../services/starfighters/starfighters.service';
import { Matchup } from '../../models/matchup';
import { Player } from '../../models/player-enum';
import { gameModules, gameComponents } from '../../game.module';
import { SummaryDialogComponent } from '../../components/summary-dialog/summary-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('GameContainer', () => {
    let component: GameContainerComponent;
    let fixture: ComponentFixture<GameContainerComponent>;
    let overlayContainerElement: HTMLElement;

    const exampleStarfighters = {
        morePowerfulOne: {
            name: 'Death Star',
            model: 'DS-1 Orbital Battle Station',
            manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
            cost_in_credits: '1000000000000',
            length: '120000',
            max_atmosphering_speed: 'n/a',
            crew: '342953',
            passengers: '843342',
            cargo_capacity: '1000000000000',
            consumables: '3 years',
            hyperdrive_rating: '4.0',
            MGLT: '10',
            starship_class: 'Deep Space Mobile Battlestation',
            pilots: [],
            films: [
                'https://swapi.co/api/films/1/'
            ],
            created: '2014-12-10T16:36:50.509000Z',
            edited: '2014-12-22T17:35:44.452589Z',
            url: 'https://swapi.co/api/starships/9/'
        },
        lessPowerfulOne: {
            name: 'Sentinel-class landing craft',
            model: 'Sentinel-class landing craft',
            manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
            cost_in_credits: '240000',
            length: '38',
            max_atmosphering_speed: '1000',
            crew: '5',
            passengers: '75',
            cargo_capacity: '180000',
            consumables: '1 month',
            hyperdrive_rating: '1.0',
            MGLT: '70',
            starship_class: 'landing craft',
            pilots: [],
            films: [
                'https://swapi.co/api/films/1/'
            ],
            created: '2014-12-10T15:48:00.586000Z',
            edited: '2014-12-22T17:35:44.431407Z',
            url: 'https://swapi.co/api/starships/5/'
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...gameModules,
                BrowserAnimationsModule,
                HttpClientModule,
                RouterTestingModule
            ],
            declarations: [
                ...gameComponents
            ],
            providers: [
                StarfightersService,
                 { provide: OverlayContainer, useFactory: () => {
                    overlayContainerElement = document.createElement('div');
                    return { getContainerElement: () => overlayContainerElement };
                    }
                }
            ]
        })
        .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [ SummaryDialogComponent ] }
        });

        fixture = TestBed.createComponent(GameContainerComponent);
        component = fixture.componentInstance;
    });

    it('Should pick player one as a winner basing on overwhelming advantage', () => {
        const matchup: Matchup = {
            playerOnePick:  exampleStarfighters.morePowerfulOne,
            playerTwoPick: exampleStarfighters.lessPowerfulOne
        };

        expect(component.pickWinner(matchup)).toBe(Player.PlayerOne);
    });

    it('Should get a draw due to mirror matchup', () => {
        const matchup: Matchup = {
            playerOnePick:  exampleStarfighters.morePowerfulOne,
            playerTwoPick: exampleStarfighters.morePowerfulOne
        };

        expect(component.pickWinner(matchup)).toBe(Player.Draw);
    });

    it('Should make sure component is up and ready for player one', () => {
        fixture.detectChanges();

        const element: HTMLElement = fixture.debugElement
                                    .query(By.css('#cy-waiting-for-player-one'))
                                    .nativeElement;

        expect(element.innerText).toContain('Player 1');
    });

    it('Should open sidenav at the beginning of the game', () => {
        fixture.detectChanges();

        const sidenav: DebugElement = fixture.debugElement
                               .query(By.css('.mat-sidenav'));

        expect(sidenav.attributes.opened).toBeDefined();
    });

    it('Should display winner wheel after declaring a winner for certain round', () => {
        component.matchups[0] = {
            playerOnePick: exampleStarfighters.morePowerfulOne,
            playerTwoPick: exampleStarfighters.lessPowerfulOne,
            winner: Player.PlayerOne
        };
        component.round = 1;
        fixture.detectChanges();

        const element: HTMLElement = fixture.debugElement
        .query(By.css('#test-wheel'))
        .nativeElement;

        expect(element).toBeTruthy();
    });

    it('Should display a point for player one on the ui', () => {
        fixture.detectChanges();
        component.playerOnePoints = [ 1 ];
        fixture.detectChanges();

        const element: HTMLElement = fixture.debugElement
        .query(By.css('#test-player-one-point-0'))
        .nativeElement;

        expect(element).toBeTruthy();
    });

    it('Should display a scoreboard on the ui', () => {
        fixture.detectChanges();
        component.round = 5;
        component.matchups = [
            {
                playerOnePick: exampleStarfighters.lessPowerfulOne,
                playerTwoPick: exampleStarfighters.lessPowerfulOne,
                winner: Player.Draw
            }
        ];
        component.onNextRound();
        fixture.detectChanges();

        // CDK overlay lays beyond the component so I took different approach here
        const table = overlayContainerElement.querySelector('#test-summary-table');
        expect(table).toBeTruthy();
    });

});
