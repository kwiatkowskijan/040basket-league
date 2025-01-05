import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { TournamentComponent } from '../tournament/tournament.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [TournamentComponent, CommonModule, RouterLink],
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent {

  tournamentList: Tournament[] = [];

  constructor(private tournamentService: TournamentService) {
    this.tournamentService.getAllTournaments().then((tournamentList: Tournament[]) => {
      this.tournamentList = tournamentList;
      console.log(this.tournamentList);
    })
  }
}
