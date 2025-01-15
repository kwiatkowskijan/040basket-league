import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  route: ActivatedRoute = inject(ActivatedRoute);
  playerService = inject(PlayersService);
  player: Player | undefined;

  constructor() {
    this.playerId = this.route.snapshot.params["id"];

    this.playerService.getPlayerById(this.playerId).then(player => {
      this.player = player;
    })
  }

}
