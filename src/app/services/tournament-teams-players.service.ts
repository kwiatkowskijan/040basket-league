import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentTeamsPlayersService {

  url = "http://localhost:3000/tournaments";

  constructor(private http: HttpClient) { }
}
