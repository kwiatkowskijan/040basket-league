import { Component } from '@angular/core';
import { Player } from '../../models/player';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.css'
})
export class PlayerDetailsComponent {
  playerId!: string;

  constructor() {
    
  }

}
