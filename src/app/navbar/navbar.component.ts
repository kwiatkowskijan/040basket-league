import { Component, inject } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  tournamentService = inject(TournamentService);
  selectedTournamentId: string | null = null;
  tournament: Tournament | undefined;

  navItems = [
    {
      route: '/tournaments',
      icon: 'emoji_events',
      label: 'Tournaments',
    },
    {
      route: '/players',
      icon: 'group',
      label: 'Players'
    }
  ];

  tournamentNavItems: Array<{ route: any[] | string, icon: string, label: string }> = [];

  ngOnInit() {
    this.tournamentService.selectedTournament$.subscribe(tournamentId => {
      this.selectedTournamentId = tournamentId;
      console.log(tournamentId);

      if (this.selectedTournamentId) {

        this.tournamentService.getTournamentById(this.selectedTournamentId).then(tournament => {
          this.tournament = tournament;
        })

        this.tournamentNavItems = [
          {
            route: ['/tournament', this.selectedTournamentId],
            icon: 'emoji_events',
            label: 'Dashboard'
          },
          {
            route: ['/tournament', this.selectedTournamentId, 'edit'],
            icon: 'settings',
            label: 'Settings'
          },
          {
            route: ['/tournament', this.selectedTournamentId, 'teams'],
            icon: 'groups_2',
            label: 'Teams'
          },
          {
            route: '/players',
            icon: 'group',
            label: 'Players'
          }
        ];
      } else {
        this.tournamentNavItems = [];
      }
    });
  }
}
