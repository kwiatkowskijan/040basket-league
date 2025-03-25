import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tournament } from '../../../models/tournament';
import { TournamentService } from '../../../services/tournament.service';
import { TeamsService } from '../../../services/teams.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatDividerModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, RouterLink],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentDetailsComponent {
  tournamentId!: number;
  route: ActivatedRoute = inject(ActivatedRoute);
  tournamentService = inject(TournamentService);
  teamsService = inject(TeamsService);
  tournament: Tournament | undefined;

  isEditing = false;
  isNew = false;

  readonly minStartDate = new Date();

  editTournamentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    startDate: new FormControl(),
    endDate: new FormControl(),
    maxPlayersInTeam: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private router: Router) {
    this.tournamentId = this.route.snapshot.params["id"];

    if (this.tournamentId === undefined) {
      this.isNew = true;
      this.isEditing = true;
    }

    if (this.isNew) {
      this.tournament = {} as Tournament;
    } else {
      this.tournamentService.getTournamentById(this.tournamentId).then(tournament => {
        this.tournament = tournament;

        this.editTournamentForm.setValue({
          name: this.tournament?.name ?? '',
          place: this.tournament?.place ?? '',
          startDate: this.tournament?.startDate ?? '',
          endDate: this.tournament?.endDate ?? '',
          maxPlayersInTeam: this.tournament?.maxPlayersInTeam ?? null
        });
      });
    }
  }

  toggleEditMode() {
    if(!this.isEditing) {
      this.isEditing = true;
    } else if(this.isEditing) {
      this.isEditing = false;
    }
  }

  editAddTournament(form: FormGroup) {
    console.log(this.tournament);

    if (this.tournament) {
      this.tournament.name = form.value.name ?? '';
      this.tournament.place = form.value.place ?? '';
      this.tournament.startDate = form.value.startDate ?? '';
      this.tournament.endDate = form.value.endDate ?? '';
      this.tournament.maxPlayersInTeam = form.value.maxPlayersInTeam ?? null;

      if (this.isNew) {
        this.tournamentService.addTournament(this.tournament).subscribe({
          next: (data) => {
            this.tournament = data;
            this.isNew = false;
            this.toggleEditMode();
            this.router.navigate(['/tournaments'])
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        });
      } else {
        this.tournamentService.editTournament(this.tournament).subscribe({
          next: (data) => {
            this.tournament = data;
            this.toggleEditMode();
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        });
      }
    }
  }

  deleteTournament() {
    if (this.tournament && !this.isNew) {
      this.tournamentService.deleteTournament(this.tournament.id).subscribe({
        next: (data) => {
          this.tournament = data;
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
    }
  }
}