import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css'
})
export class TournamentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  tournamentService = inject(TournamentService);
  teamsService = inject(TeamsService);
  tournament: Tournament | undefined;
  teamsInTournament: Team[] = [];
  isEditing = false;

  editTournamentForm = new FormGroup({
    place: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor() {
    const tournamentId = Number(this.route.snapshot.params["id"]);

    this.tournamentService.getTournamentById(tournamentId).then(tournament => {
      this.tournament = tournament;

      this.editTournamentForm.setValue({
        place: this.tournament?.place || '',
        startDate: this.tournament?.startDate || '',
        endDate: this.tournament?.endDate || ''
      });
    });

    this.teamsService.getTeamsByTournament(tournamentId).then(teamsInTournament => {
      this.teamsInTournament = teamsInTournament;
    });
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

  editTournament(form: FormGroup) {
    if (this.tournament) {
      console.log(form);
      this.tournament.place = form.value.place ?? '';
      this.tournament.startDate = form.value.startDate ?? '';
      this.tournament.endDate = form.value.endDate ?? '';
      console.log(this.tournament);
    }
  }
}
