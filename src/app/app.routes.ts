import { Routes } from '@angular/router';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        title: 'Dashboard'
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
    }
];
