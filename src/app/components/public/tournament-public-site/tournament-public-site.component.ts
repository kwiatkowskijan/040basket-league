import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from '../../../models/tournament';
import { TournamentService } from '../../../services/tournament.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-public-site',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './tournament-public-site.component.html',
  styleUrl: './tournament-public-site.component.css'
})
export class TournamentPublicSiteComponent {
  tournament?: Tournament;
  tournamentService = inject(TournamentService);
  tournamentId!: number;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.tournamentId = this.route.snapshot.params["id"];

    try {
      this.tournament = await this.tournamentService.getTournamentById(this.tournamentId);
    } catch (error) {
      console.error(`Error while loading tournament: ${error}`)
    }
  }
}
