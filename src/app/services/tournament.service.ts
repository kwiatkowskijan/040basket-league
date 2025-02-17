import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tournament } from '../models/tournament';


@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  url = "http://localhost:3000/tournaments";

  private selectedTournamentSubject = new BehaviorSubject<number | null>(this.getStoredTournament());
  selectedTournament$ = this.selectedTournamentSubject.asObservable();

  constructor(private http: HttpClient) { }

  async getAllTournaments(): Promise<Tournament[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getTournamentById(id: number): Promise<Tournament | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  editTournament(tournament: Tournament): Observable<any> {
    return this.http.put(`${this.url}/${tournament.id}`, tournament);
  }

  addTournament(tournament: Tournament): Observable<any> {
    return this.http.post(this.url, tournament);
  }

  deleteTournament(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  setSelectedTournament(id: number) {
    sessionStorage.setItem('tournamentId', id.toString());
    this.selectedTournamentSubject.next(id);
  }

  getStoredTournament(): number | null {
    const tournamentId = sessionStorage.getItem('tournamentId');
    return tournamentId !== null ? Number(tournamentId) : null;
  }

  clearSelectedTournament() {
    this.selectedTournamentSubject.next(null);
    sessionStorage.removeItem('tournamentId');
  }
}
