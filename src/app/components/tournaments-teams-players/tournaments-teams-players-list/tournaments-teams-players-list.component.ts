import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentTeamsPlayersService } from '../../../services/tournament-teams-players.service';
import { TournamentsTeamsPlayer } from '../../../models/tournaments-teams-player';
import { Player } from '../../../models/player';
import { PlayersService } from '../../../services/players.service';
import { TeamsService } from '../../../services/teams.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-tournaments-teams-players-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, RouterLink, MatDividerModule, MatListModule, MatMenuModule],
  templateUrl: './tournaments-teams-players-list.component.html',
  styleUrl: './tournaments-teams-players-list.component.css'
})
export class TournamentsTeamsPlayersListComponent {
  @Input() tournamentId!: number;
  @Input() teamId!: number;
  tournamentsTeamsPlayers: TournamentsTeamsPlayer[] = [];
  tournamentTeamsPlayersService = inject(TournamentTeamsPlayersService);
  playersService = inject(PlayersService);
  teamsService = inject(TeamsService);
  availblePlayers: Player[] = [];
  teamsPlayers: TournamentsTeamsPlayer[] = [];
  isAddingPlayer = false;

  addPlayersForm = new FormGroup({
    player: new FormControl('', [Validators.required])
  })

  constructor(private router: Router) {
    this.playersService.getAllPlayers().then(allPlayers => {
      // console.log(allPlayers);
      // this.teamsService.getTeamsByTournament(this.tournamentId).then(teams => {
      //   console.log(teams);
      //   teams.forEach(teamItem => {
      //     this.tournamentTeamsPlayersService.getAllPlayersByTeam(teamItem.tournamentId, teamItem.id).then(player => {
      //       console.log(player);
      //       this.teamsPlayers.push(player);
      //     })
      //     // teamItem.players.forEach(player => {
      //     //   console.log(player);
      //     //   this.teamsPlayers.push(player);
      //     // })
      //   });
      //   console.log(this.teamsPlayers);
      //   this.availblePlayers = allPlayers.filter(player => {
      //     return !this.teamsPlayers?.find(teamsPlayer => teamsPlayer.id === player.id);
      //   });
      // });
    });
  }

  ngOnInit() {
    this.tournamentTeamsPlayersService.getAllPlayersByTeam(this.tournamentId, this.teamId).then(tournamentsTeamsPlayers => {
      this.tournamentsTeamsPlayers = tournamentsTeamsPlayers;
    });
  }

  addNewPlayer() {
    this.isAddingPlayer = true;
  }

  addPlayersToTeam(form: FormGroup) {

  }

  removePlayerFromTeam(playerId: number) {

  }
}
