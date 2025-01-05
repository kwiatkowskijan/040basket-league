import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url = "http://localhost:3000/teams";

  constructor() { }

  async getTeamsByTournament(tournamentId: Number): Promise<Team[]> {
    const data = await fetch(`${this.url}?tournamentId=${tournamentId}`);
    return await data.json() ?? [];
  }
}
