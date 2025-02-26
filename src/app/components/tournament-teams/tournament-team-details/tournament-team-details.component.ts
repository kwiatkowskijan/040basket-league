import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Team } from '../../../models/team';
import { Player } from '../../../models/player';
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
import { TournamentsTeamsPlayersListComponent } from '../../tournaments-teams-players/tournaments-teams-players-list/tournaments-teams-players-list.component';

@Component({
  selector: 'app-tournament-team-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule, RouterLink, MatDividerModule, MatListModule, MatMenuModule, TournamentsTeamsPlayersListComponent],
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
  team: Team | undefined;
  tournament: Tournament | undefined;
  isEditing = false;
  isNew = false;
  // isAddingPlayer = false;
  // availblePlayers: Player[] = [];
  // teamsPlayers: Player[] = [];

  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(50)])
  })

  // addPlayersForm = new FormGroup({
  //   player: new FormControl('', [Validators.required]),
  //   playerNumber: new FormControl('', [Validators.required, Validators.min(0), Validators.max(99)])
  // })

  constructor(private router: Router) {
    this.tournamentId = Number(this.route.snapshot.params["id"]);
    this.teamId = this.route.snapshot.params["id2"];

    if (this.teamId === undefined) {
      this.isNew = true;
      this.isEditing = true;
    }

    if (this.isNew) {
      this.team = {} as Team;
    } else {
      this.teamService.getTeamById(this.tournamentId, this.teamId).then(team => {
        this.team = team;
        this.teamForm.setValue({
          name: this.team?.name ?? '',
          city: this.team?.city ?? ''
        })
      });
    }

    this.tournamentService.getTournamentById(this.tournamentId).then(tournament => {
      this.tournament = tournament;
    })

    // this.playerService.getAllPlayers().then(allPlayers => {
    //   this.teamService.getTeamsByTournament(this.tournamentId).then(teams => {
    //     teams.forEach(teamItem => {
    //       teamItem.players?.forEach(player => {
    //         this.teamsPlayers.push(player);
    //       })
    //     });
    //     this.availblePlayers = allPlayers.filter(player => {
    //       return !this.teamsPlayers?.find(teamsPlayer => teamsPlayer.id === player.id);
    //     });
    //   });
    // });
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

  // addNewPlayer() {
  //   this.isAddingPlayer = true;
  // }

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

  // addPlayersToTeam(form: FormGroup) {
  //   if (this.team) {
  //     const selectedPlayersIds = form.value.player;
  //     const selectedPlayerNumber = form.value.playerNumber;

  //     const selectedPlayers = this.availblePlayers.filter(player =>
  //       selectedPlayersIds.includes(player.id)
  //     );

  //     selectedPlayers.forEach(player => {
  //       player.number = selectedPlayerNumber;
  //     });

  //     this.team.players.push(...selectedPlayers);

  //     this.teamService.editTeam(this.tournamentId, this.team).subscribe({
  //       next: (data) => {
  //         this.team = data;
  //         this.isAddingPlayer = false;
  //       },
  //       error: (error) => {
  //         console.error('Wystąpił błąd podczas dodawania graczy:', error);
  //       }
  //     });
  //   }
  // }

  // removePlayerFromTeam(playerId: number) {
  //   if (this.team) {
  //     this.team.players = this.team.players.filter(player => player.id !== playerId);

  //     this.teamService.editTeam(this.tournamentId, this.team).subscribe({
  //       next: (data) => {
  //         this.team = data;
  //         this.isAddingPlayer = false;
  //       },
  //       error: (error) => {
  //         console.error('Wystąpił błąd podczas usuwania gracza:', error);
  //       }
  //     })
  //   }
  // }
}
