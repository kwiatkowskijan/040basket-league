import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { Player } from '../models/player';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url = "http://localhost:3000/teams";

  constructor(private http: HttpClient) { }

  async getTeamById(teamId: string): Promise<Team> {
    const data = await fetch(`${this.url}/${teamId}`);
    return await data.json() ?? [];
  }

  async getTeamsByTournament(tournamentId: string): Promise<Team[]> {
    const data = await fetch(`${this.url}?tournamentId=${tournamentId}`);
    return await data.json() ?? [];
  }

  // async getAllTeamPlayers(teamId: string): Promise<Player[]> {

  // }

  createTeam(team: Team): Observable<any> {
    return this.http.post(this.url, team);
  }

  editTeam(team: Team): Observable<any> {
    return this.http.put(`${this.url}/${team.id}`, team)
  }

  deleteTeam(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
