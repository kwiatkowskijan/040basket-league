import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentTeamsPlayersService } from '../../../services/tournament-teams-players.service';
import { TournamentsTeamsPlayer } from '../../../models/tournaments-teams-player';

@Component({
  selector: 'app-tournaments-teams-players-list',
  standalone: true,
  imports: [],
  templateUrl: './tournaments-teams-players-list.component.html',
  styleUrl: './tournaments-teams-players-list.component.css'
})
export class TournamentsTeamsPlayersListComponent {
  @Input() tournamentId!: number;
  @Input() teamId!: number;
  tournamentsTeamsPlayers: TournamentsTeamsPlayer[] = [];
  tournamentTeamsPlayersService = inject(TournamentTeamsPlayersService);

  constructor() {}

  ngOnInit() {
    this.tournamentTeamsPlayersService.getAllPlayersByTeam(this.tournamentId, this.teamId).then(tournamentsTeamsPlayers => {
      this.tournamentsTeamsPlayers = tournamentsTeamsPlayers;
      console.log(this.tournamentsTeamsPlayers);
    });
  }
}
