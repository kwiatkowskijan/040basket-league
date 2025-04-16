import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Team } from '../../../models/team';
import { Tournament } from '../../../models/tournament';
import { TeamsService } from '../../../services/teams.service';
import { PlayersService } from '../../../services/players.service';
import { TournamentService } from '../../../services/tournament.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  playerService = inject(PlayersService);
  tournamentService = inject(TournamentService);
  tournamentsTeamsPlayersService = inject(TournamentTeamsPlayersService);
  team: Team | undefined;
  tournament?: Tournament;
  maxPlayers: number = 0;
  availblePlayers: Player[] = [];
  isEditing = false;
  isNew = false;

  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(50)])
  })

  constructor(private router: Router) { }

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
      console.log(this.availblePlayers)
      if (this.isNew) {
        this.team = {} as Team;
      } else {
        const team = await this.teamService.getTeamById(this.tournamentId, this.teamId);
        this.team = team;
        this.teamForm.setValue({
          name: this.team?.name ?? '',
          city: this.team?.city ?? ''
        })
      }
    }
    catch (error) {
      console.error('Error fetching tournament:', error);
    }

    this.maxPlayers = this.tournament?.maxPlayersInTeam ?? 0;
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

  createEditTeam(form: FormGroup) {
    if (this.team) {
      this.team.tournamentId = this.tournamentId;
      this.team.name = form.value.name ?? '';
      this.team.city = form.value.city ?? '';

      if (this.isNew) {
        this.teamService.createTeam(this.tournamentId, this.team).subscribe({
          next: (data) => {
            console.log(data);
            console.log(this.team)
            this.team = data;
            this.isNew = false;
            this.isEditing = false;
            console.log("Adding succesful!")
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        });
      } else {
        this.teamService.editTeam(this.tournamentId, this.team).subscribe({
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
}
