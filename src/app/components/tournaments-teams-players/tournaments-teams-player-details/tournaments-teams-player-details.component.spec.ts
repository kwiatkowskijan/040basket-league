import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsTeamsPlayerDetailsComponent } from './tournaments-teams-player-details.component';

describe('TournamentsTeamsPlayerDetailsComponent', () => {
  let component: TournamentsTeamsPlayerDetailsComponent;
  let fixture: ComponentFixture<TournamentsTeamsPlayerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentsTeamsPlayerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentsTeamsPlayerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
