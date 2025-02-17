import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentTeamListComponent } from './tournament-team-list.component';

describe('TournamentTeamListComponent', () => {
  let component: TournamentTeamListComponent;
  let fixture: ComponentFixture<TournamentTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentTeamListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
