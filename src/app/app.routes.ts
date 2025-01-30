import { Routes } from '@angular/router';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TournamentTeamDetailsComponent } from './tournament-team-details/tournament-team-details/tournament-team-details.component';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { PlayerDetailsComponent } from './players/player-details/player-details.component';

export const routes: Routes = [
    {
        path: '',
        component: TournamentListComponent,
        title: 'Tournaments'
    },
    {
        path: 'tournament',
        component: TournamentDetailsComponent,
        title: 'Details'
    },
    {
        path: 'tournament/:id',
        component: TournamentDetailsComponent,
        title: 'Details'
    },
    {
        path: 'tournament/:id/team/:id2',
        component: TournamentTeamDetailsComponent,
        title: 'Team'
    },
    {
        path: 'tournament/:id/team',
        component: TournamentTeamDetailsComponent,
        title: 'Team'
    },
    {
        path: 'players',
        component: PlayersListComponent,
        title: 'Players'
    },
    {
        path: 'player',
        component: PlayerDetailsComponent,
        title: 'Player'
    },
    {
        path: 'player/:id',
        component: PlayerDetailsComponent,
        title: 'Player'
    }
];
