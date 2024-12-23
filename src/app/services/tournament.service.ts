import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  
  url = "http://localhost:3000/tournaments";

  constructor() { }

  async getAllTournaments() : Promise<Tournament[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getTournamentById(id: Number): Promise<Tournament | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  editTournament(place: String, startDate: Date, endDate: Date) {
    console.log(place, startDate, endDate);
  }
}
