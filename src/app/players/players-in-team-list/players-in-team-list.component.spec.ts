import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersInTeamListComponent } from './players-in-team-list.component';

describe('PlayersInTeamListComponent', () => {
  let component: PlayersInTeamListComponent;
  let fixture: ComponentFixture<PlayersInTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersInTeamListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersInTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
