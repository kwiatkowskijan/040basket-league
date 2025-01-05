import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';
import { TournamentComponent } from '../tournament/tournament.component';

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
  isNew = false;

  editTournamentForm = new FormGroup({
    name: new FormControl(''),
    place: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor() {
    const tournamentId = this.route.snapshot.params["id"];

    console.log(tournamentId);

    if (tournamentId === undefined) {
      this.isNew = true;
      this.isEditing = true;
    }

    if (this.isNew) {
      this.tournament = {} as Tournament;
      console.log(this.tournament);
    } else {
      this.tournamentService.getTournamentById(tournamentId).then(tournament => {
        this.tournament = tournament;

        this.editTournamentForm.setValue({
          name: this.tournament?.name ?? '',
          place: this.tournament?.place ?? '',
          startDate: this.tournament?.startDate ?? '',
          endDate: this.tournament?.endDate ?? ''
        });
      });

      this.teamsService.getTeamsByTournament(tournamentId).then(teamsInTournament => {
        this.teamsInTournament = teamsInTournament;
      });
    }
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

  editAddTournament(form: FormGroup) {
    console.log(this.tournament);

    if (this.tournament) {
      this.tournament.name = form.value.name ?? '';
      this.tournament.place = form.value.place ?? '';
      this.tournament.startDate = form.value.startDate ?? '';
      this.tournament.endDate = form.value.endDate ?? '';

      if (this.isNew) {
        this.tournamentService.addTournament(this.tournament).subscribe(
          (data) => {
            this.tournament = data;
            this.isNew = false;
            this.isEditing = false;
            console.log("Adding succesful!")
            console.log(this.tournament);
          },
          (error) => {
            console.error('Error fetching posts:', error);
          }
        );
      } else {
        this.tournamentService.editTournament(this.tournament).subscribe(
          (data) => {
            this.tournament = data;
            this.isEditing = false;
            console.log("Update succesful!")
            console.log(this.tournament);
          },
          (error) => {
            console.error('Error fetching posts:', error);
          }
        );
      }
    }
  }

  deleteTournament() {
    if (this.tournament && !this.isNew) {
      this.tournamentService.deleteTournament(this.tournament.id).subscribe(
        (data) => {
          this.tournament = data;
          console.log("Delete succesful!")
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      )
    }
  }
}

// export class TournamentObject implements Tournament {
//   id: number = 0;
//   name: string = '';
//   startDate: Date = '';
//   endDate: Date = ;
//   place: string = '';
// };