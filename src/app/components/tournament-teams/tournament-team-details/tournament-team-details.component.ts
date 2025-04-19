import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Team } from '../../../models/team';
import { Tournament } from '../../../models/tournament';
import { TeamsService } from '../../../services/teams.service';
import { TournamentService } from '../../../services/tournament.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { TournamentsTeamsPlayersListComponent } from '../../tournaments-teams-players/tournaments-teams-players-list/tournaments-teams-players-list.component';
import { TournamentTeamsPlayersService } from '../../../services/tournament-teams-players.service';
import { Player } from '../../../models/player';
import { AddEditTeamFormComponent } from '../add-edit-team-form/add-edit-team-form.component';
import { TournamentsTeamsPlayer } from '../../../models/tournaments-teams-player';

@Component({
  selector: 'app-tournament-team-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, RouterLink, MatDividerModule, MatListModule, MatMenuModule,
    TournamentsTeamsPlayersListComponent, MatTabsModule, AddEditTeamFormComponent],
  templateUrl: './tournament-team-details.component.html',
  styleUrl: './tournament-team-details.component.css'
})
export class TournamentTeamDetailsComponent {
  teamId!: number;
  tournamentId!: number;
  route: ActivatedRoute = inject(ActivatedRoute);
  teamService = inject(TeamsService);
  tournamentService = inject(TournamentService);
  tournamentsTeamsPlayersService = inject(TournamentTeamsPlayersService);
  team?: Team;
  tournament?: Tournament;
  maxPlayers: number = 0;
  availblePlayers: Player[] = [];
  isEditing = false;
  isNew = false;

  constructor(private router: Router, private location: Location) { }

  async ngOnInit() {

    this.tournamentId = this.route.snapshot.params["id"];
    this.teamId = this.route.snapshot.params["id2"];

    if (this.teamId === undefined) {
      this.isNew = true;
      this.isEditing = true;
    }

    try {
      this.tournament = await this.tournamentService.getTournamentById(this.tournamentId);
      this.availblePlayers = await this.tournamentService.getPlayersWithoutTeam(this.tournamentId);

      if (this.isNew) {
        this.team = {} as Team;
      } else {
        const team = await this.teamService.getTeamById(this.tournamentId, this.teamId);
        this.team = team;
      }
    }
    catch (error) {
      console.error('Error fetching tournament:', error);
    }

    this.maxPlayers = this.tournament?.maxPlayersInTeam ?? 0;
  }

  goBack() {
    this.location.back();
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

  getTeamData($event: FormGroup) {
    console.log($event.controls);
  }

  createEditTeam(form: FormGroup) {
    if (this.team) {

      const players = this.getPlayersFromForm(form);

      // this.team.tournamentId = this.tournamentId;
      // this.team.name = form.value.name ?? '';
      // this.team.city = form.value.city ?? '';

      if (this.isNew) {
        this.CreateTeam(players);
      } else {
        this.EditTeam();
      }
    }
  }

  deleteTeam() {
    if (this.team && !this.isNew) {
      this.teamService.deleteTeam(this.tournamentId, this.team.id).subscribe({
        next: (data) => {
          this.team = data;
          this.router.navigate(['/tournament', this.tournamentId]);
          console.log("Delete succesful!")
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
    }
  }

  private CreateTeam(players: Player[]) {
    this.teamService.createTeam(this.tournamentId, this.team!).subscribe({
      next: (data) => {
        const createdTeamId = data.id;
        this.team = data;
        this.AddPlayersToTeam(createdTeamId, players);
        this.isNew = false;
        this.isEditing = false;
        console.log("Successfully created team:", data);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  private EditTeam() {
    this.teamService.editTeam(this.tournamentId, this.team!).subscribe({
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

  private getPlayersFromForm(form: FormGroup): Player[] {
    const players: Player[] = [];

    Object.keys(form.controls).forEach((key) => {
      if (key.startsWith('player')) {
        const player = form.get(key)?.value;
        if (player) {
          players.push(player);
        }
      }
    });

    return players;
  }

  private AddPlayersToTeam(teamId: number, players: Player[]) {
    players.forEach((player) => {
      const teamPlayer: TournamentsTeamsPlayer = {
        id: 0,
        teamId: teamId,
        playerId: player.id,
        player: player,
        number: 0,
        isCaptain: false
      }

      this.tournamentsTeamsPlayersService.addPlayerToTeam(this.tournamentId, this.teamId, teamPlayer).subscribe({
        next: (data) => {
          console.log("Successfully added player to team:", data);
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      });
    });
  }
}
