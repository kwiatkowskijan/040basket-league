import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player';
import { PlayersService } from '../../services/players.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsComponent {
  playerId!: string;
  route: ActivatedRoute = inject(ActivatedRoute);
  playerService = inject(PlayersService);
  player: Player | undefined;
  isEditing = false;
  isNew = false;

  playerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl()
  })

  constructor() {
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

  addEditPlayer() {

  }

}
