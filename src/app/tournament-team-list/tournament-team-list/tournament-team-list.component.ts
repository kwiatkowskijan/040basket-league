import { Component, inject, Input } from '@angular/core';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tournament-team-list',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './tournament-team-list.component.html',
  styleUrl: './tournament-team-list.component.css'
})
export class TournamentTeamListComponent {
  @Input() tournamentId!: string;
  teamsInTournament: Team[] = [];
  maxVisibleTeams = 5;
  teamsService = inject(TeamsService);

  addTeamForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl('')
  })

  ngOnInit() {
    this.teamsService.getTeamsByTournament(this.tournamentId).then(teamsInTournament => {
      this.teamsInTournament = teamsInTournament;
    });
  }

  loadMoreTeams() {
    this.maxVisibleTeams = this.teamsInTournament.length;
  }

  addTeamToTournament(form: FormGroup) {

    const teamName: string = form.value.name ?? '';
    const teamCity: string = form.value.city ?? '';

    let team: Team = {
      id: 0,
      name: teamName,
      city: teamCity,
      tournamentId: this.tournamentId
    }

    this.teamsService.createTeam(team).subscribe(
      (data) => {
        team = data;
        console.log('Adding succesfull');
      },
      (error) => {
        console.log("Error adding team to tournament", error);
      }
    )
  }
}
