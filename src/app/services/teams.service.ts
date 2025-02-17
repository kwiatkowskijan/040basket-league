import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url = "http://localhost:3000/tournaments";

  constructor(private http: HttpClient) { }

  async getTeamById(tournamentId: number, teamId: number): Promise<Team> {
    const data = await fetch(`${this.url}/${tournamentId}/teams/${teamId}`);
    return await data.json() ?? [];
  }

  async getTeamsByTournament(tournamentId: number): Promise<Team[]> {
    const data = await fetch(`http://localhost:3000/tournaments/${tournamentId}/teams`);
    return await data.json() ?? [];
  }

  createTeam(tournamentId: number, team: Team): Observable<any> {
    return this.http.post(`${this.url}/${tournamentId}/teams`, team);
  }

  editTeam(tournamentId: number, team: Team): Observable<any> {
    return this.http.put(`${this.url}/${tournamentId}/teams/${team.id}`, team)
  }

  deleteTeam(tournamentId: number, teamId: number): Observable<any> {
    return this.http.delete(`${this.url}/${tournamentId}/teams/${teamId}`);
  }
}
