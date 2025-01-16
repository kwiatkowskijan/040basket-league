import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { Team } from '../models/team';
import { TeamsService } from '../services/teams.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TournamentTeamListComponent } from '../tournament-team-list/tournament-team-list/tournament-team-list.component';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatDividerModule, MatInputModule, MatFormFieldModule, TournamentTeamListComponent],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css'
})
export class TournamentDetailsComponent {
  tournamentId!: string;
  route: ActivatedRoute = inject(ActivatedRoute);
  tournamentService = inject(TournamentService);
  teamsService = inject(TeamsService);
  tournament: Tournament | undefined;
  isEditing = false;
  isNew = false;

  editTournamentForm = new FormGroup({
    name: new FormControl(''),
    place: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor() {
    this.tournamentId = this.route.snapshot.params["id"];

    if (this.tournamentId === undefined) {
      this.isNew = true;
      this.isEditing = true;
    }

    if (this.isNew) {
      this.tournament = {} as Tournament;
    } else {
      this.tournamentService.getTournamentById(this.tournamentId).then(tournament => {
        this.tournament = tournament;

        this.editTournamentForm.setValue({
          name: this.tournament?.name ?? '',
          place: this.tournament?.place ?? '',
          startDate: this.tournament?.startDate ?? '',
          endDate: this.tournament?.endDate ?? ''
        });
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

      // Zrozumieć na czym polega subskrypcja

      if (this.isNew) {
        this.tournamentService.addTournament(this.tournament).subscribe({
          next: (data) => {
            this.tournament = data;
            this.isNew = false;
            this.isEditing = false;
            console.log("Adding succesful!")
            console.log(this.tournament);
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        });
      } else {
        this.tournamentService.editTournament(this.tournament).subscribe({
          next: (data) => {
            this.tournament = data;
            this.isEditing = false;
            console.log("Update succesful!")
            console.log(this.tournament);
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        });
      }
    }
  }

  deleteTournament() {
    if (this.tournament && !this.isNew) {
      this.tournamentService.deleteTournament(this.tournament.id).subscribe({
        next: (data) => {
          this.tournament = data;
          console.log("Delete succesful!")
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
    }
  }

  // addTeamToTournament(form: FormGroup) {
  //   if(this.tournament && !this.isNew) {

  //     const teamName: string = form.value.name ?? '';
  //     const teamCity: string = form.value.city ?? '';

  //     let team: Team = {
  //       id: 0,
  //       name: teamName,
  //       city: teamCity,
  //       tournamentId: this.tournament.id
  //     }

  //     this.teamsService.createTeam(team).subscribe (
  //       (data) => {
  //         team = data;
  //         console.log('Adding succesfull');
  //       },
  //       (error) => {
  //         console.log("Error adding team to tournament", error);
  //       }
  //     )
  //   }
  // }
}

// export class TournamentObject implements Tournament {
//   id: number = 0;
//   name: string = '';
//   startDate: Date = '';
//   endDate: Date = ;
//   place: string = '';
// };