import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../models/tournament';


@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  
  url = "http://localhost:3000/tournaments";

  constructor(private http: HttpClient) { }

  async getAllTournaments() : Promise<Tournament[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getTournamentById(id: Number): Promise<Tournament | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  editTournament(tournament: Tournament) {
    return this.http.put(`${this.url}/${tournament.id}`, tournament);
  }
}
