import { Injectable } from '@angular/core';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url = "http://localhost:3000/tournaments/:id/teams";

  constructor(private http: HttpClient) { }

  async getTeamById(teamId: number): Promise<Team> {
    const data = await fetch(`${this.url}/${teamId}`);
    return await data.json() ?? [];
  }

  async getTeamsByTournament(tournamentId: number): Promise<Team[]> {
    const data = await fetch(`http://localhost:3000/tournaments/${tournamentId}/teams`);
    return await data.json() ?? [];
  }

  createTeam(team: Team): Observable<any> {
    return this.http.post(this.url, team);
  }

  editTeam(team: Team): Observable<any> {
    return this.http.put(`${this.url}/${team.id}`, team)
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
