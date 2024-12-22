import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css'
})
export class TournamentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  tournamentService = inject(TournamentService);
  teamsService = inject(TeamsService);
  tournament: Tournament | undefined;
  teamsInTournament: Team[] = [];

  constructor() {
    const tournamentId = Number(this.route.snapshot.params["id"]);
    
    this.tournamentService.getTournamentById(tournamentId).then(tournament => {
      this.tournament = tournament;
    });

    this.teamsService.getTeamsByTournament(tournamentId).then(teamsInTournament => {
      this.teamsInTournament = teamsInTournament;
    })
  }
}
