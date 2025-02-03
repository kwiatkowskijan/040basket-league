import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
  @Input() tournament!: Tournament;
  tournamentService = inject(TournamentService);

  selectTournament(tournamentId: string) {
    this.tournamentService.setSelectedTournament(tournamentId);
  }
}
