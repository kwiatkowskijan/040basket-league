import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TournamentsTeamsPlayer } from '../../../models/tournaments-teams-player';
import { TournamentTeamsPlayersService } from '../../../services/tournament-teams-players.service';

@Component({
  selector: 'app-tournaments-teams-player-details',
  imports: [],
  templateUrl: './tournaments-teams-player-details.component.html',
  styleUrl: './tournaments-teams-player-details.component.css'
})
export class TournamentsTeamsPlayerDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  tournamentTeamsPlayersService = inject(TournamentTeamsPlayersService);
  tournamentId!: number;
  teamId!: number;
  playerId!: number;

  player: TournamentsTeamsPlayer | undefined;

  constructor(private router: Router) {
    this.tournamentId = this.route.snapshot.params["id"];
    this.teamId = this.route.snapshot.params["id2"];
    this.playerId = this.route.snapshot.params["id3"];

    this.tournamentTeamsPlayersService.getPlayerByTeam(this.tournamentId, this.teamId, this.playerId).then(team => {
      this.player = team;
    });
  }
}
