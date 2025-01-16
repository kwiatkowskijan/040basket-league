import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player';
import { PlayersService } from '../../services/players.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css'
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
    birthdate: new FormControl()
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
      })
    }
  }

  turnOnEditMode() {
    this.isEditing = true;
  }

}
