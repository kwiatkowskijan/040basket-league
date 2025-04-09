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
  availblePlayers: Player[] = [];
  tournamentTeamsPlayersService = inject(TournamentTeamsPlayersService);
  playersService = inject(PlayersService);
  teamsService = inject(TeamsService);
  isAddingPlayer = false;

  addPlayersForm = new FormGroup({
    player: new FormControl('', [Validators.required])
  })

  constructor(private router: Router) { }

  async ngOnInit() {
    try {
      this.tournamentsTeamsPlayers = await this.tournamentTeamsPlayersService.getAllPlayersByTeam(this.tournamentId, this.teamId);
    } catch (error) {
      console.error(error);
    }
  }

  addNewPlayer() {
    this.isAddingPlayer = true;
  }

  addPlayersToTeam(form: FormGroup) {

  }

  removePlayerFromTeam(playerId: number) {

  }
}
