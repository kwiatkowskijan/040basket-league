import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  url = "http://localhost:3000/players";

  constructor(private http: HttpClient) { }

  async getAllPlayers(): Promise<Player[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }

  createPlayer(player: Player): Observable<any> {
    return this.http.post(this.url, player);
  }

  editPlayer(player: Player): Observable<any> {
    return this.http.put(`${this.url}/${player.id}`, player);
  }

  deletePlayer(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
