import { Starfighter } from './starfighter';
import { Player } from './player-enum';

export interface Matchup {
    playerOnePick?: Starfighter;
    playerTwoPick?: Starfighter;
    winner?: Player;
}
