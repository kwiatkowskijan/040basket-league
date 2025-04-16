import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeamFormComponent } from './add-edit-team-form.component';

describe('AddEditTeamFormComponent', () => {
  let component: AddEditTeamFormComponent;
  let fixture: ComponentFixture<AddEditTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTeamFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
