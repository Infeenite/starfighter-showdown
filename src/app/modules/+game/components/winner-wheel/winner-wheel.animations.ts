import { trigger, state, style, transition, animate } from '@angular/animations';


export const playerOneWinsAnimation = trigger('playerOneWins', [
    state('void', style({ transform: 'rotate(0)' })),
    state('*', style({ transform: 'rotate(1620deg)' })),
    transition(':enter', animate('1000ms ease-out'))
]);

export const winnerAnimation = trigger('winner', [
    state('void', style({ transform: 'rotate(0)' })),
    state('1', style({ transform: 'rotate(1620deg)' })),
    state('2', style({ transform: 'rotate(1800deg)' })),
    state('3', style({ transform: 'rotate(1890deg)' })),
    transition(':enter',
    animate('1000ms ease-out'))
]);

export const playerTwoWinsAnimation = trigger('playerTwoWins', [
    state('void', style({ transform: 'rotate(0)' })),
    state('*', style({ transform: 'rotate(1800deg)' })),
    transition(':enter', animate('1000ms ease-out'))
]);

export const drawAnimation = trigger('draw', [
    state('void', style({ transform: 'rotate(0)' })),
    state('*', style({ transform: 'rotate(1890deg)' })),
    transition(':enter', animate('1000ms ease-out'))
]);

export const verdictAnimation = trigger('verdict', [
    state('void', style({ opacity: '0', transform: 'translateY(30%)' })),
    state('*', style({ opacity: '1', transform: 'translateY(0)' })),
    transition(':enter', animate('400ms 1000ms ease-out'))
]);
