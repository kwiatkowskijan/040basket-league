import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsTeamsPlayersListComponent } from './tournaments-teams-players-list.component';

describe('TournamentsTeamsPlayersListComponent', () => {
  let component: TournamentsTeamsPlayersListComponent;
  let fixture: ComponentFixture<TournamentsTeamsPlayersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentsTeamsPlayersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentsTeamsPlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
