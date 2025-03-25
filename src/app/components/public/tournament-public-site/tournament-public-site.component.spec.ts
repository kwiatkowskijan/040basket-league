import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentPublicSiteComponent } from './tournament-public-site.component';

describe('TournamentPublicSiteComponent', () => {
  let component: TournamentPublicSiteComponent;
  let fixture: ComponentFixture<TournamentPublicSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentPublicSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentPublicSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
