import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from '../models/tournament';
import { TournamentService } from '../services/tournament.service';
import { TournamentComponent } from '../tournament/tournament.component';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [TournamentComponent, CommonModule, RouterLink, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  tournamentList: Tournament[] = [];
  displayedTournamentList: Tournament[] = [];
  searchTournamentControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private tournamentService: TournamentService) {
    this.tournamentService.getAllTournaments().then((tournamentList: Tournament[]) => {
      this.tournamentList = tournamentList;
      this.displayedTournamentList = tournamentList;
      this.tournamentList.forEach(tournament => {
        this.options.push(tournament.name);
      })
      console.log(this.tournamentList);
    })
  }

  ngOnInit() {
    this.filteredOptions = this.searchTournamentControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterTournaments(tournamentName: string) {
    console.log(tournamentName);
    this.displayedTournamentList = this.tournamentList.filter(filteredTournament => filteredTournament.name === tournamentName);
  }
}
