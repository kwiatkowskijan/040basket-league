import { TestBed } from '@angular/core/testing';

import { TournamentTeamsPlayersService } from './tournament-teams-players.service';

describe('TournamentTeamsPlayersService', () => {
  let service: TournamentTeamsPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentTeamsPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
