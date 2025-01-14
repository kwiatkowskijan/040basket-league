import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tournament-team-details',
  standalone: true,
  imports: [],
  templateUrl: './tournament-team-details.component.html',
  styleUrl: './tournament-team-details.component.css'
})
export class TournamentTeamDetailsComponent {
  teamId!: string;
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.teamId = this.route.snapshot.params["id"];
  }

}
