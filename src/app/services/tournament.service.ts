import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament';


@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  url = "http://localhost:3000/tournaments";

  constructor(private http: HttpClient) { }

  async getAllTournaments(): Promise<Tournament[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getTournamentById(id: string): Promise<Tournament | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  editTournament(tournament: Tournament): Observable<any> {
    return this.http.put(`${this.url}/${tournament.id}`, tournament);
  }

  addTournament(tournament: Tournament): Observable<any> {
    return this.http.post(this.url, tournament);
  }

  deleteTournament(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
