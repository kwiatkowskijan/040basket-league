import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Player } from '../../../models/player';
import { PlayersService } from '../../../services/players.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatDatepickerModule, RouterModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent {
  playerId!: number;
  route: ActivatedRoute = inject(ActivatedRoute);
  playerService = inject(PlayersService);
  player: Player | undefined;
  isEditing = false;
  isNew = false;

  currentDate = new Date();
  maxBirthdate = new Date(this.currentDate);

  playerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl()
  })

  constructor(private router: Router) {
    this.maxBirthdate.setFullYear(this.currentDate.getFullYear() - 15);
    this.playerId = this.route.snapshot.params["id"];

    if (this.playerId === undefined) {
      this.isNew = true;
      this.isEditing = true;
    }

    if (this.isNew) {
      this.player = {} as Player;
    } else {
      this.playerService.getPlayerById(this.playerId).then(player => {
        this.player = player;

        this.playerForm.setValue({
          name: this.player?.name ?? '',
          surname: this.player?.surname ?? '',
          email: this.player?.email ?? '',
          birthDate: this.player?.birthDate ?? ''
        });
      })
    }
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

  createEditPlayer(form: FormGroup) {
    if (this.player) {
      this.player.name = form.value.name ?? '';
      this.player.surname = form.value.surname ?? '';
      this.player.email = form.value.email ?? '';
      this.player.birthDate = form.value.birthDate ?? '';
      
      //this.player.birthDate.toLocaleDateString();
      if (this.isNew) {
        this.playerService.createPlayer(this.player).subscribe({
          next: (data) => {
            this.player = data;
            this.isNew = false;
            this.isEditing = false;
            this.router.navigate(['/players']);
            console.log("Adding succesful!")
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        });
      } else {
        this.playerService.editPlayer(this.player).subscribe({
          next: (data) => {
            this.player = data;
            this.isEditing = false;
            console.log("Update succesful!")
          },
          error: (error) => {
            console.error('Error fetching posts:', error);
          }
        })
      }
    }
  }

  deletePlayer() {
    if (this.player && !this.isNew) {
      this.playerService.deletePlayer(this.player.id).subscribe({
        next: (data) => {
          this.player = data;
          this.router.navigate(['/players']);
          console.log("Delete succesful!")
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      })
    }
  }
}
