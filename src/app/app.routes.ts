import { Routes } from '@angular/router';
import { TournamentListComponent } from './components/tournament/tournaments-list/tournament-list.component';
import { TournamentDetailsComponent } from './components/tournament/tournament-details/tournament-details.component';
import { TournamentTeamDetailsComponent } from './components/tournament-teams/tournament-team-details/tournament-team-details.component';
import { TournamentTeamListComponent } from './components/tournament-teams/tournament-team-list/tournament-team-list.component';
import { PlayersListComponent } from './components/players/players-list/players-list.component';
import { PlayerDetailsComponent } from './components/players/player-details/player-details.component';
import { TournamentSettingsComponent } from './components/tournament/tournament-settings/tournament-settings.component';
import { TournamentsTeamsPlayerDetailsComponent } from './components/tournaments-teams-players/tournaments-teams-player-details/tournaments-teams-player-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/tournaments',
        pathMatch: 'full'
    },
    {
        path: 'tournaments',
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
        path: 'tournament/:id/teams',
        component: TournamentTeamListComponent,
        title: 'Teams'
    },
    {
        path: 'tournament/:id/team/:id2/players/:id3',
        component: TournamentsTeamsPlayerDetailsComponent,
        title: 'Player'
    },
    {
        path: 'tournament/:id/edit',
        component: TournamentSettingsComponent,
        title: 'Edit tournament'
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
