import { Component, Input } from '@angular/core';
import { Tournament } from '../models/tournament';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournament',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent {
  @Input() tournament!: Tournament;
}
