import { Component, inject } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TournamentService } from '../services/tournament.service';

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

  tournamentNavItems: Array<{ route: any[], icon: string, label: string }> = [];

  ngOnInit() {
    this.tournamentService.selectedTournament$.subscribe(tournamentId => {
      this.selectedTournamentId = tournamentId;

      if (this.selectedTournamentId) {
        this.tournamentNavItems = [
          {
            route: ['/tournament', this.selectedTournamentId],
            icon: 'emoji_events',
            label: 'Dashboard'
          },
          {
            route: ['/tournament', this.selectedTournamentId, 'teams'],
            icon: 'groups_2',
            label: 'Teams'
          }
        ];
      } else {
        this.tournamentNavItems = [];
      }
    });
  }
}
