import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../models/team';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-tournament-team-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-team-details.component.html',
  styleUrl: './tournament-team-details.component.css'
})
export class TournamentTeamDetailsComponent {
  teamId!: string;
  route: ActivatedRoute = inject(ActivatedRoute);
  teamService = inject(TeamsService);
  team: Team | undefined;

  constructor() {
    this.teamId = this.route.snapshot.params["id"];

    this.teamService.getTeamById(this.teamId).then(team => {
      this.team = team;
    });
  }
}
