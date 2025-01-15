import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../services/players.service';
import { Player } from '../../models/player';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule],
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
