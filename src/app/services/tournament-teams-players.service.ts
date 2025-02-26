import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournamentsTeamsPlayer } from '../models/tournaments-teams-player';

@Injectable({
  providedIn: 'root'
})
export class TournamentTeamsPlayersService {

  url = "http://localhost:3000/tournaments";

  constructor(private http: HttpClient) { }

  async getPlayerByTeam(tournamentId: number, teamId: number, id: number): Promise<TournamentsTeamsPlayer> {
    const data = await fetch(`${this.url}/${tournamentId}/teams/${teamId}/players/${id}`);
    return await data.json() ?? [];
  }

  async getAllPlayersByTeam(tournamentId: number, teamId: number): Promise<TournamentsTeamsPlayer[]> {
    const data = await fetch(`${this.url}/${tournamentId}/teams/${teamId}/players`);
    return await data.json() ?? [];
  }

  addPlayerToTeam(tournamentId: number, teamId: number, player: TournamentsTeamsPlayer): Observable<any> {
    return this.http.post(`${this.url}/${tournamentId}/teams/${teamId}/players`, player);
  }

  editPlayerInTeam(tournamentId: number, teamId: number, player: TournamentsTeamsPlayer): Observable<any> {
    return this.http.put(`${this.url}/${tournamentId}/teams/${teamId}/players`, player)
  }

  removePlayerFromTeam(tournamentId: number, teamId: number, id: number): Observable<any> {
    return this.http.delete(`${this.url}/${tournamentId}/teams/${teamId}/players/${id}`);
  }
}
