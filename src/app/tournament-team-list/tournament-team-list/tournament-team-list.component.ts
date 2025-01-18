import { Component, inject, Input } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tournament-team-list',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './tournament-team-list.component.html',
  styleUrl: './tournament-team-list.component.css'
})
export class TournamentTeamListComponent {
  @Input() tournamentId!: string;
  teamsInTournament: Team[] = [];
  maxVisibleTeams = 5;
  teamsService = inject(TeamsService);

  addTeamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(50)])
  })

  ngOnInit() {
    this.teamsService.getTeamsByTournament(this.tournamentId).then(teamsInTournament => {
      this.teamsInTournament = teamsInTournament;
    });
  }

  loadMoreTeams() {
    this.maxVisibleTeams = this.teamsInTournament.length;
  }
}
