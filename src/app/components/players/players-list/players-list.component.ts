import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../../services/players.service';
import { Player } from '../../../models/player';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css'
})
export class PlayersListComponent {

  playerList!: Player[];

  constructor(private playersServie: PlayersService) {
    this.playersServie.getAllPlayers().then((playerList: Player[]) => {
      this.playerList = playerList;
    })
  }
}
