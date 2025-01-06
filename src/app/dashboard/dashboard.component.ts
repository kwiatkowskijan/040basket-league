import { Component } from '@angular/core';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tournamentList: Tournament[] = [];
  currentDate = new Date();

  constructor(private tournamentService: TournamentService) {
    this.tournamentService.getAllTournaments().then((tournamentList: Tournament[]) => {
      this.tournamentList = tournamentList;
      
      this.tournamentList = tournamentList.map(tournament => {
        tournament.startDate = new Date(tournament.startDate);
        return tournament;
      });
    })
  }
}
