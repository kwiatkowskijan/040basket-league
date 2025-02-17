import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentTeamDetailsComponent } from './tournament-team-details.component';

describe('TournamentTeamDetailsComponent', () => {
  let component: TournamentTeamDetailsComponent;
  let fixture: ComponentFixture<TournamentTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentTeamDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
