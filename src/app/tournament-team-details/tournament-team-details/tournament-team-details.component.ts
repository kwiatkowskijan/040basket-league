import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tournament-team-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './tournament-team-details.component.html',
  styleUrl: './tournament-team-details.component.css'
})
export class TournamentTeamDetailsComponent {
  teamId!: string;
  tournamentId!: string;
  route: ActivatedRoute = inject(ActivatedRoute);
  teamService = inject(TeamsService);
  team: Team | undefined;
  isEditing = false;
  isNew = false;

  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(50)])
  })

  constructor() {
    this.tournamentId = this.route.snapshot.params["id"];
    this.teamId = this.route.snapshot.params["id2"];

    if(this.teamId === undefined) {
      this.isNew = true;
      this.isEditing = true;
    }

    if (this.isNew) {
      this.team = {} as Team;
    } else {
      this.teamService.getTeamById(this.teamId).then(team => {
        this.team = team;

        this.teamForm.setValue({
          name: this.team?.name ?? '',
          city: this.team?.city ?? ''
        })
      });
    }
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

  createEditTeam(form: FormGroup) {
    if(this.team) {
      this.team.name = form.value.name ?? '';
      this.team.city = form.value.city ?? '';
      this.team.tournamentId = this.tournamentId;

      if(this.isNew) {
        this.teamService.createTeam(this.team).subscribe({
          next: (data) => {
            this.team = data;
            this.isNew = false;
            this.isEditing = false;
            console.log("Adding succesful!")
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        });
      } else {
        this.teamService.editTeam(this.team).subscribe({
          next: (data) => {
            this.team = data;
            this.isEditing = false;
            console.log("Update succesful!");
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        })
      }
    }
  }

  deleteTeam() {
    if(this.team && !this.isNew) {
      this.teamService.deleteTeam(this.team.id).subscribe({
        next: (data) => {
          this.team = data;
          console.log("Delete succesful!")
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
    }
  }
}
